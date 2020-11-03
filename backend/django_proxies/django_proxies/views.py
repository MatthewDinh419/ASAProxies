from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
from django.conf import settings
import stripe
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_201_CREATED
from django_proxies.models import (
    Order,
    UserProfile,
    Payment,
    Item,
    Coupon,
    Plan
)
import json
import time
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .serializers import PlanSerializer
from django.core import serializers
import requests
import random
stripe.api_key = settings.STRIPE_SECRET_KEY
smart_proxy_api_userid = settings.SMART_PROXY_USERID

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    email_plaintext_message = "Click the link below to reset your password:\n\nhttp://localhost:3000/password-change/?token={}\n\nIf you did not request this password reset. Consider changing your password to protect your account.\n".format(reset_password_token.key)
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

class VerifyInfoView(APIView):
    """
    An endpoint for checking sign up form
    """
    def post(self, request, *args, **kwargs):
        email_count = len(User.objects.filter(email=request.data.get('email')))
        return Response({'email_error': "" if email_count <= 0 else "Email already exists"}, status=HTTP_200_OK)

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
                print(self.request.user.email)
                print(token)
                customer = stripe.Customer.create(
                    email=self.request.user.email,
                    source=token
                )
                print("yes")
                print("lsg", customer['id'])
                userprofile.stripe_customer_id = customer['id']
                print("sds")
                userprofile.one_click_purchasing = True
                print("dsdsf")
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
                newplan.gb = carted_item.gb
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
            print(e)
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
            print(e)
            return Response({'message': "A serious error occurred. We have been notifed"})

        # return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)
        return Response({'message': "Invalid data received."})

class PlanListView(ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

    def get_queryset(self, *args, **kwargs):
        if(not self.request.user.is_authenticated):
            return Response("User is not authenticated", status=status.HTTP_401_UNAUTHORIZED)
        num_results = Plan.objects.filter(user = self.request.user).count()
        if (num_results >= 1): #if user already has an existing plan
            dupl_obj = Plan.objects.filter(user=self.request.user)
            return dupl_obj
        return Response("User does not have a plan", status=status.HTTP_404_NOT_FOUND)

class PlanCreateView(CreateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

    def perform_create(self, serializer):
        curr_user = Token.objects.get(key=self.request.data['auth_token']).user
        num_results = Plan.objects.filter(user = curr_user).count()
        if (num_results >= 1): #if user already has an existing plan
            dupl_obj = Plan.objects.get(user=curr_user)
            dupl_obj.gb = dupl_obj.gb + self.request.data['gb']
            dupl_obj.save()
        else: #otherwise create a new plan for the user
            serializer.save(user=curr_user)

class PlanUpdateView(UpdateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

class SubuserView(APIView):
    """
    An endpoint for creating or updating the subuser information
    """
    def get(self, request, *args, **kwargs):
        if(not self.request.user.is_authenticated):
            return Response(HTTP_401_UNAUTHORIZED)
        user_plan = Plan.objects.get(user=self.request.user)
        if(user_plan is None):
            return Response(HTTP_401_UNAUTHORIZED)
        
        # Generate token for authentication
        url = "https://api.smartproxy.com/v1/auth"
        headers = {"Authorization": "Basic YXNhcHJveGllc2NvbnRhY3RAZ21haWwuY29tOjc4ckMweFhrT1BEbQ=="}
        response = requests.request("POST", url, headers=headers)
        smart_proxy_api_token = json.loads(response.text)['token']

        if(user_plan.sub_user_username == None): #No subuser yet
            # Generate subuser info
            user_plan.sub_user_username = user_plan.generateInfo(20)
            user_plan.sub_user_password = user_plan.generateInfo(20)
            user_plan.save()

            # Create subuser
            url = "https://api.smartproxy.com/v1/users/{}/sub-users".format(smart_proxy_api_userid)
            payload = {
                "service_type": "residential_proxies",
                "auto_disable": True,
                "username": user_plan.sub_user_username,
                "password": user_plan.sub_user_password,
                "traffic_limit": user_plan.gb
            }
            headers = {
                "Content-Type": "application/json",
                "Authorization": "Token " + smart_proxy_api_token
            }
            response = requests.request("POST", url, json=payload, headers=headers)

            # Find subuser id
            url = "https://api.smartproxy.com/v1/users/{}/sub-users".format(smart_proxy_api_userid)
            querystring = {"service_type":"residential_proxies"}
            headers = {"Authorization": "Token " + smart_proxy_api_token}
            response = requests.request("GET", url, headers=headers, params=querystring)
            sub_users = json.loads(response.text)
            for sub_user in sub_users:
                if(sub_user['username'] == user_plan.sub_user_username):
                    user_plan.sub_user_id = sub_user['id']
                    user_plan.save()
            return Response(status=HTTP_201_CREATED)

        else: #subuser exists, update plan
            url = "https://api.smartproxy.com/v1/users/{}/sub-users/{}".format(smart_proxy_api_userid, user_plan.sub_user_id)
            payload = {
                "auto_disable": True,
                "traffic_limit": user_plan.gb
            }
            headers = {
                "Content-Type": "application/json",
                "Authorization": "Token " + smart_proxy_api_token
            }
            response = requests.request("PUT", url, json=payload, headers=headers)
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_201_CREATED)

class GenerateProxiesView(APIView):
    """
    An endpoint for generating proxies
    """
    def post(self, request, *args, **kwargs):
        if(not self.request.user.is_authenticated):
            return Response(HTTP_401_UNAUTHORIZED)
        user_plan = Plan.objects.get(user=self.request.user)
        if(user_plan == None):
            return Response(HTTP_400_BAD_REQUEST)

        # Create smart proxy token for authentication
        url = "https://api.smartproxy.com/v1/auth"
        headers = {"Authorization": "Basic YXNhcHJveGllc2NvbnRhY3RAZ21haWwuY29tOjc4ckMweFhrT1BEbQ=="}
        response = requests.request("POST", url, headers=headers)
        smart_proxy_api_token = json.loads(response.text)['token']
        
        # Region and corresponding port ranges for static proxies
        region = request.data.get('region')
        region_ports = {
            "USA": ["us.smartproxy.com",10001,29999], 
            "Canada": ["ca.smartproxy.com",20001,29999],
            "GB": ["gb.smartproxy.com",30001,49999],
            "Germany": ["de.smartproxy.com",20001,29999], 
            "France": ["fr.smartproxy.com",40001,49999],
            "Spain": ["es.smartproxy.com",10001,19999],
            "Italy": ["it.smartproxy.com",20001,29999], 
            "Sweden": ["se.smartproxy.com",20001,29999],
            "Greece": ["gr.smartproxy.com",30001,39999]}

        # Generate proxies 
        count = request.data.get('count')
        proxies = []
        for i in range(int(count)):
            port = random.randrange(region_ports[region][1], region_ports[region][2])
            port = str(port)
            proxies.append(region_ports[region][0] + ":" + port + ":" + user_plan.sub_user_username + ":" + user_plan.sub_user_password)
        return Response({"proxies": proxies}, HTTP_201_CREATED)

class SubUserTrafficView(APIView):
    """
    An endpoint for checking subuser traffic
    """
    def get(self, request, *args, **kwargs):
        if(not self.request.user.is_authenticated):
            return Response(HTTP_401_UNAUTHORIZED)
        # user_plan = Plan.objects.get(user=self.request.user)
        user_plan = get_object_or_404(Plan, user=self.request.user)
        if(user_plan == None):
            return Response(HTTP_400_BAD_REQUEST)
        if(user_plan.gb == 0): # User does not have a plan
            return Response(HTTP_400_BAD_REQUEST)
        if(user_plan.gb != 0 and user_plan.sub_user_username == None): # User has plan but no subuser has been created yet
            url = "http://127.0.0.1:8000/api/sub-user/"
            headers = {"Authorization": self.request.headers['Authorization']}
            response = requests.request("GET", url, headers=headers)
            user_plan = get_object_or_404(Plan, user=self.request.user) #refresh user plan

        # Create smart proxy token for authentication
        url = "https://api.smartproxy.com/v1/auth"
        headers = {"Authorization": "Basic YXNhcHJveGllc2NvbnRhY3RAZ21haWwuY29tOjc4ckMweFhrT1BEbQ=="}
        response = requests.request("POST", url, headers=headers)
        smart_proxy_api_token = json.loads(response.text)['token']

        # Create date variables
        user_plan_date = user_plan.sub_user_date
        sub_date = "{}-{}-{}".format(user_plan_date.year,user_plan_date.month,user_plan_date.day)
        curr_date_raw = user_plan.currentTime()
        curr_date = "{}-{}-{}".format(curr_date_raw.year, curr_date_raw.month, curr_date_raw.day)

        # Traffic usage request
        url = "https://api.smartproxy.com/v1/users/{}/sub-users/{}/traffic".format(smart_proxy_api_userid, user_plan.sub_user_id)
        querystring = {"type":"custom", "from": sub_date, "to": curr_date, "serviceType": "residential_proxies"}
        headers = {"Authorization": "Token " + smart_proxy_api_token}
        response = requests.request("GET", url, headers=headers, params=querystring)
        data_usage = json.loads(response.text)['traffic']

        return Response({'gb_usage': data_usage, 'gb_total': user_plan.gb}, status=HTTP_200_OK)

class PaymentHistoryView(APIView):
    def get(self, request, *args, **kwargs):
        print("yes?")
        if(not self.request.user.is_authenticated):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        num_results = Order.objects.filter(user = self.request.user).count()
        print(num_results)
        if (num_results >= 1): #if user already has an existing plan
            list_return = []
            dupl_obj = Order.objects.filter(user=self.request.user)
            for order_obj in dupl_obj:
                print(order_obj)
                list_return.append({"order_date": "{}-{}-{}".format(order_obj.ordered_date.month,order_obj.ordered_date.day,order_obj.ordered_date.year),
                                    "order_num": order_obj.ref_code,
                                    "item_name": order_obj.item.title,
                                    "coupon": None if order_obj.coupon == None else order_obj.coupon.code,
                                    "cost": order_obj.payment.amount/100})
            return Response(list_return, status=HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)