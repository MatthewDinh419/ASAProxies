from django.test import TestCase, Client
import requests
from django_proxies.models import (
    Order,
    UserProfile,
    Payment,
    Item,
    Plan,
    Stock
)
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.test import APIClient
import json

# These unit tests will test API calls to endpoint involving the django backend
class BackendTest(TestCase):

    def setUp(self):
        # test_order_history user
        user = User.objects.create_superuser('order_history_empty_user', 'order_history_empty_user@dinhbuy.com', 'hello123')
        user_profile = UserProfile.objects.create(user=user)
        user = User.objects.create_superuser('order_history_user_1', 'order_history_user@dinhbuy.com', 'hello123')
        user_profile = UserProfile.objects.create(user=user)
        test_item_1 = Item.objects.create(title="1GB RESI PLAN", price=10.00, gb=1)
        test_item_2 = Item.objects.create(title="2GB RESI PLAN", price=20.00, gb=2)
        test_payment_1 = Payment.objects.create(stripe_charge_id="test_payment_1", user=user_profile, amount=1000.00)
        test_payment_2 = Payment.objects.create(stripe_charge_id="test_payment_2", user=user_profile, amount=2000.00)

        temp_order = Order()
        new_order_1 = Order.objects.create(user=user_profile, item=test_item_1, payment=test_payment_1, ref_code=temp_order.generate_ref_code())
        new_order_2 = Order.objects.create(user=user_profile, item=test_item_2, payment=test_payment_2, ref_code=temp_order.generate_ref_code())

        # test_change_password user
        user = User.objects.create_superuser('test_change_password_logged_in', 'test_change_password_logged_in@dinhbuy.com', 'hello123')

        # test_email_exists
        user = User.objects.create_superuser('test_email_exists', 'test_email_exists@dinhbuy.com', 'hello123')

    # /api/verify-info/
    # Test for checking if an email exists
    def test_email_exists(self):
        print('\ntest_email_exists(): Starting...')
        # Get user information
        user = User.objects.get(username='test_email_exists')
        client = APIClient()
        response = client.post('/api/verify-info/', {'email': 'test_email_exists@dinhbuy.com'})
        self.assertEqual(response.status_code, 200, msg="test_email_exists(): Something went wrong")
        email_error = response.data['email_error']
        self.assertTrue(email_error != "", msg="test_email_exists(): Email not found")
        
        response = client.post('/api/verify-info/', {'email': 'does_not_exist@dinhbuy.com'})
        email_error = response.data['email_error']
        self.assertTrue(email_error == "", msg="test_email_exists(): Email found")

    # /api/change-password/
    # Test for changing password when the user is logged in
    def test_change_password_logged_in(self):
        print('\ntest_change_password_logged_in(): Starting...')
        # Get user information
        user = User.objects.get(username='test_change_password_logged_in')
        token, created = Token.objects.get_or_create(user=user)
        client = APIClient()
        client.login(username='test_change_password_logged_in', password='2222')
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        # Endpoint call to change password
        print("test_change_password_logged_in(): Changing password")
        response = client.post('/api/change-password/', {'old_password': 'hello123', 'new_password': 'hello1234'})
        self.assertEqual(response.status_code, 200, msg="test_change_password_logged_in(): Password could not be changed")
        
        client.logout()
        logged_in = client.login(username='test_change_password_logged_in', password='hello1234')
        self.assertTrue(logged_in, msg="test_change_password_logged_in(): Password is incorrect")

        # Edgecase 1: Incorrect length password
        print("test_change_password_logged_in(): Edgecase 1: Incorrect Length")
        token, created = Token.objects.get_or_create(user=user)
        client = APIClient()
        client.login(username='test_change_password_logged_in', password='1234')
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        response = client.post('/api/change-password/', {'old_password': 'hello123', 'new_password': 'h'})
        self.assertEqual(response.status_code, 400, msg="test_change_password_logged_in(): Password changed with incorrect length")

    # def test_order_history(self):
        print("\ntest_order_history(): Starting...")
        # Edgecase 1: User is not authenticated
        print("test_order_history(): Starting Edgecase 1")
        client = APIClient()
        response = client.get('/api/payment-history/')
        self.assertEqual(response.status_code, 401, msg="test_order_history(): Not authenticated user passed through")

        # Edgecase 2: User has no orders
        print("test_order_history(): Starting Edgecase 2")
        user = User.objects.get(username='order_history_empty_user')
        client = APIClient()
        client.login(username='order_history_empty_user', password='hello123')
        token, created = Token.objects.get_or_create(user=user)
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        response = client.get('/api/payment-history/')
        self.assertEqual(response.status_code, 404, msg="test_order_history(): No order error")

        # Edgecase 3: Normal user has orders
        # Find order history information
        print("test_order_history(): Starting Edgecase 3")
        user = User.objects.get(username='order_history_user_1')
        token, created = Token.objects.get_or_create(user=user)
        client = APIClient()
        client.login(username='order_history_user_1', password='hello123')
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        # Endpoint call to retrieve orders
        print("test_order_history(): Retrieving orders")
        response = client.get('/api/payment-history/')
        self.assertEqual(response.status_code, 200, msg="test_order_history(): Failed to retrieve user orders")
        order_1 = response.data[0]
        order_2 = response.data[1]
        self.assertEqual(order_1['order_num'], 'RES1', msg="test_order_history(): Incorrect order number (1)")
        self.assertEqual(order_1['item_name'], '1GB RESI PLAN', msg="test_order_history(): Incorrect item name (1)")
        self.assertEqual(order_1['cost'], 10.00, msg="test_order_history(): Incorrect order cost (1)")
        self.assertEqual(order_2['order_num'], 'RES2', msg="test_order_history(): Incorrect order number (2)")
        self.assertEqual(order_2['item_name'], '2GB RESI PLAN', msg="test_order_history(): Incorrect item name (2)")
        self.assertEqual(order_2['cost'], 20.00, msg="test_order_history(): Incorrect order cost (2)")
