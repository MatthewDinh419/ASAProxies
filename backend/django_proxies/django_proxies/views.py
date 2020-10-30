from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
from django.conf import settings
import stripe
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from django_proxies.models import (
    Order,
    UserProfile,
    Payment,
    Item,
    Coupon
)
from plan.models import (
    Plan
)
import json
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
stripe.api_key = settings.STRIPE_SECRET_KEY

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    # email_plaintext_message = "http://127.0.0.1:8000{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    email_plaintext_message = "http://localhost:3000/password-change/?token={}".format(reset_password_token.key)
    send_mail(
        # title:
        "Password Reset for {title}".format(title="Asaproxies"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )

class ChangePasswordView(APIView):
    """
    An endpoint for changing password.
    """
    def post(self, request, *args, **kwargs):
        if(not self.request.user.is_authenticated): #if the user is not authenticated
            return Response(status=HTTP_401_UNAUTHORIZED)
        if(not self.request.user.check_password(request.data.get('old_password'))):
            return Response(status=HTTP_400_BAD_REQUEST)
        self.request.user.set_password(request.data.get('new_password'))
        self.request.user.save()
        return Response(HTTP_200_OK)

class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code', None)
        if code is None:
            return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)
        coupon = get_object_or_404(Coupon, code=code.upper())
        if(not coupon.valid or coupon.quantity <= 0):
            return Response({'message': "Coupon has expired"}, status=HTTP_400_BAD_REQUEST) 
        coupon.quantity = coupon.quantity - 1
        coupon.save()
        return Response({'discount': coupon.amount}, status=HTTP_200_OK)

class PaymentView(APIView):

    def post(self, request, *args, **kwargs):
        token = request.data.get('stripeToken')
        if(not self.request.user.is_authenticated): #if the user is not authenticated
            return Response(status=HTTP_401_UNAUTHORIZED)
        userprofile = UserProfile.objects.get_or_create(user=self.request.user)[0]
        order = Order()
        try:
            #Create user profile if there is not one already
            if userprofile.stripe_customer_id != '' and userprofile.stripe_customer_id is not None:
                customer = stripe.Customer.retrieve(
                    userprofile.stripe_customer_id)
                customer.source = token
                customer.save()
            else:
                customer = stripe.Customer.create(
                    email=self.request.user.email,
                    source=token
                )
                userprofile.stripe_customer_id = customer['id']
                userprofile.one_click_purchasing = True
                userprofile.save()
            #Find item
            carted_item = Item.objects.get(title=request.data.get('item'))
            amount = -1
            #Coupon?
            coupon_found = False
            if(request.data.get('coupon') != None): #Coupon found, double check coupon attributes
                coupon = Coupon.objects.get(code=request.data.get('coupon').upper())
                order.coupon = coupon
                amount = int(carted_item.price) - (int(carted_item.price) * (coupon.amount / 100))
                amount = int(amount)
                coupon_found = True
            else:
                amount = int(carted_item.price)

            # charge the customer
            order.ref_code = order.generate_ref_code()
            charge = stripe.Charge.create(
                amount=amount,  # cents
                currency="usd",
                customer=customer['id'],
                description="Order: {}, Customer ID: {}".format(order.ref_code, customer['id']),
            )
            # create the payment
            payment = Payment()
            payment.stripe_charge_id = charge['id']
            payment.user = self.request.user
            payment.amount = amount
            payment.save()

            # assign the payment to the order
            order.item = Item.objects.get(title=request.data.get('item'))
            order.user = self.request.user
            order.payment = payment
            order.save()

            # assign new/update plan to userprofile
            # user already has a plan
            if(userprofile.curr_plan != None):
                userprofile.curr_plan.gb = userprofile.curr_plan.gb + carted_item.gb
                userprofile.curr_plan.save()
            else: #user does not have a plan
                newplan = Plan()
                newplan.user = self.request.user
                newplan.gb = carted_item.gb.gb
                newplan.save()
                userprofile.curr_plan = newplan
                userprofile.save()
            return Response(status=HTTP_200_OK)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            return Response({'message': err.get('message'), 'card_err': True})

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            messages.warning(self.request, "Rate limit error")
            return Response({'message': "Rate limit error"})
            # return Response({"message": "Rate limit error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            # Invalid parameters were supplied to Stripe's API
            # return Response({"message": "Invalid parameters"}, status=HTTP_400_BAD_REQUEST)
            return Response({'message': "Invalid parameters to stripe API"})

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            # return Response({"message": "Not authenticated"}, status=HTTP_401_UNAUTHORIZED)
            return Response({'message': "Not authenticated. Please login"})

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            # return Response({"message": "Network error"}, status=HTTP_400_BAD_REQUEST)
            return Response({'message': "Network error"})

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            # return Response({"message": "Something went wrong. You were not charged. Please try again."}, status=HTTP_400_BAD_REQUEST)
            return Response({'message': "Something went wrong. You were not charged. Please try again"})

        except Exception as e:
            # send an email to ourselves
            # return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)
            return Response({'message': "A serious error occurred. We have been notifed"})

        # return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)
        return Response({'message': "Invalid data received."})
