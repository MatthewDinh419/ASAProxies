from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
from django.conf import settings
import stripe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from django_proxies.models import (
    Order,
    UserProfile,
    Payment,
    Item,
)
from plan.models import (
    Plan
)
stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentView(APIView):

    def post(self, request, *args, **kwargs):
        token = request.data.get('stripeToken')
        if(not self.request.user.is_authenticated): #if the user is not authenticated
            return Response(status=HTTP_401_UNAUTHORIZED)
        userprofile = UserProfile.objects.get_or_create(user=self.request.user)[0]
        #Create user profile if there is not one already
        if userprofile.stripe_customer_id != '' and userprofile.stripe_customer_id is not None:
            customer = stripe.Customer.retrieve(
                userprofile.stripe_customer_id)
        else:
            customer = stripe.Customer.create(
                email=self.request.user.email,
                source=token
            )
            userprofile.stripe_customer_id = customer['id']
            userprofile.one_click_purchasing = True
            userprofile.save()
        amount = 50

        try:
            # charge the customer
            charge = stripe.Charge.create(
                amount=amount,  # cents
                currency="usd",
                customer=customer['id']
            )

            # create the payment
            payment = Payment()
            payment.stripe_charge_id = charge['id']
            payment.user = self.request.user
            payment.amount = amount
            payment.save()

            # assign the payment to the order
            order = Order()
            order.item = Item.objects.get(title=request.data.get('item'))
            order.user = self.request.user
            order.ref_code = order.generate_ref_code()
            order.payment = payment
            order.save()

            # assign new/update plan to userprofile
            #user already has a plan
            if(userprofile.curr_plan != None):
                userprofile.curr_plan.gb = userprofile.curr_plan.gb + int(request.data.get('item'))
                userprofile.curr_plan.save()
            else: #user does not have a plan
                newplan = Plan()
                newplan.user = self.request.user
                newplan.gb = int(request.data.get('item'))
                newplan.save()
                userprofile.curr_plan = newplan
                userprofile.save()
            return Response(status=HTTP_200_OK)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            return Response({"message": f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            messages.warning(self.request, "Rate limit error")
            return Response({"message": "Rate limit error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            # Invalid parameters were supplied to Stripe's API
            return Response({"message": "Invalid parameters"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response({"message": "Not authenticated"}, status=HTTP_401_UNAUTHORIZED)

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            return Response({"message": "Network error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            return Response({"message": "Something went wrong. You were not charged. Please try again."}, status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            # send an email to ourselves
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)

        return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)