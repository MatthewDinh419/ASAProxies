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
    Plan,
    Stock
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

class StripeWebhookView(APIView):
    """
    /api/webhook

    An endpoint for receiving stripe events

    {item: "1 GB RESI PLAN"}

    """
    def post(self, request, *args, **kwargs):
        payload = request.body
        event = None

        try:
            event = stripe.Event.construct_from(
            json.loads(payload), stripe.api_key
            )
        except ValueError as e:
            # Invalid payload
            return Response(status=HTTP_400_BAD_REQUEST)

        # Handle the event
        if event.type == 'payment_intent.succeeded':
            # Setup payment intent and user profile
            payment_intent = event.data.object # contains a stripe.PaymentIntent
            curr_user = UserProfile.objects.get(stripe_customer_id=payment_intent['charges']['data'][0]['customer'])

            # create the payment
            payment = Payment()
            payment.stripe_charge_id = payment_intent['charges']['data'][0]['id']
            payment.amount = payment_intent['charges']['data'][0]['amount']
            payment.user = curr_user
            payment.save()

            # assign the payment to the order
            order = Order()
            order.user = curr_user
            order.ref_code = order.generate_ref_code()
            order.item = Item.objects.get(title=payment_intent["metadata"]["item"])
            order.payment = payment
            order.save()

            # Remove from stock
            stock = Stock.objects.get()
            stock.current_stock = stock.current_stock - order.item.gb
            stock.save()
            
            # assign new/update plan to userprofile
            if(curr_user.curr_plan != None): # user already has a plan
                curr_user.curr_plan.gb = curr_user.curr_plan.gb + order.item.gb
                curr_user.curr_plan.new_plan = True
                curr_user.curr_plan.save()
            else: #user does not have a plan
                newplan = Plan()
                newplan.user = curr_user
                newplan.gb = order.item.gb
                newplan.new_plan = True
                newplan.save()
                curr_user.curr_plan = newplan
                curr_user.save()

            # Update payment intent with new information
            stripe.PaymentIntent.modify(payment_intent["id"], description="Order: {}".format(order.ref_code))
        else:
            pass

        return Response(status=HTTP_200_OK)

class PaymentRedirectView(APIView):
    """
    /api/create-checkout-session

    An endpoint for creating a stripe session for the user

    {item: "1 GB RESI PLAN"}

    """
    def post(self, request, *args, **kwargs):
        # Check for user authentication
        if(not self.request.user.is_authenticated):
            return Response(status=HTTP_401_UNAUTHORIZED)
            
        # Check if the item is out of stock
        stock = Stock.objects.get()
        carted_item = Item.objects.get(title=request.data.get('item'))
        if(stock.current_stock - carted_item.gb < 0 or not stock.valid):
            return Response({'message': "Out of Stock"}, status=HTTP_200_OK)

        userprofile = UserProfile.objects.get_or_create(user=self.request.user)[0]

        # Setup customer information or use existing customer information
        customer_source = stripe.Source.create(
            type='ach_credit_transfer',
            currency='usd',
            owner={
                'email': self.request.user.email
            }
        )
        if userprofile.stripe_customer_id != '' and userprofile.stripe_customer_id is not None:
            customer = stripe.Customer.retrieve(
                userprofile.stripe_customer_id)
            customer.source = customer_source.id
            customer.save()
        else:
            customer = stripe.Customer.create(
                email=self.request.user.email,
                source=customer_source.id
            )
            userprofile.stripe_customer_id = customer['id']
            userprofile.one_click_purchasing = True
            userprofile.save()

        # Create stripe checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
            'price_data': {
                'currency': 'usd',
                'product_data': {
                'name': carted_item.title,
                },
                'unit_amount': int(carted_item.price),
            },
            'quantity': 1,
            }],
            mode='payment',
            allow_promotion_codes='true',
            customer=customer['id'],
            payment_intent_data={"metadata": {"item": carted_item.title}},
            success_url='http://localhost:3000/',
            cancel_url='http://localhost:3000/plans',
        )   
        return Response({"id": session.id}, status=HTTP_200_OK)

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
        user_plan = get_object_or_404(Plan, user=self.request.user)
        if(user_plan == None):
            return Response(HTTP_400_BAD_REQUEST)
        if(user_plan.gb == 0): # User does not have a plan
            return Response(HTTP_400_BAD_REQUEST)
        # User has plan but no subuser has been created yet
        # or user just bought a new plan and needs to update subuser
        if((user_plan.gb != 0 and user_plan.sub_user_username == None) or (user_plan.new_plan)): 
            url = "http://127.0.0.1:8000/api/sub-user/"
            headers = {"Authorization": self.request.headers['Authorization']}
            response = requests.request("GET", url, headers=headers)
            user_plan = get_object_or_404(Plan, user=self.request.user) #refresh user plan
            user_plan.new_plan = False
            user_plan.save()

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
    """
    An endpoint for getting all the orders from a user
    """
    def get(self, request, *args, **kwargs):
        if(not self.request.user.is_authenticated):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        user_profile = UserProfile.objects.get(user = self.request.user)
        num_results = Order.objects.filter(user = user_profile).count()
        if (num_results >= 1): #if user already has an existing plan
            list_return = []
            dupl_obj = Order.objects.filter(user=user_profile)
            for order_obj in dupl_obj:
                list_return.append({"order_date": "{}-{}-{}".format(order_obj.ordered_date.month,order_obj.ordered_date.day,order_obj.ordered_date.year),
                                    "order_num": order_obj.ref_code,
                                    "item_name": order_obj.item.title,
                                    "cost": order_obj.payment.amount/100})
            return Response(list_return, status=HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)