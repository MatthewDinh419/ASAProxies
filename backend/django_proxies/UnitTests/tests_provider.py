from django.test import TestCase, Client
import requests
from django_proxies.models import (
    UserProfile,
    Plan,
)
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.test import APIClient
import json

# These unit tests will test API calls to endpoint involving the provider
class ProviderTest(TestCase):
    oxylab_user_id = '26b86f1f-7cbf-4e79-b916-6d97a00a1bab'

    def setUp(self):
        # test_create user
        user = User.objects.create_superuser('new_user', 'new_user@dinhbuy.com', 'hello123')
        user_profile = UserProfile.objects.create(user=user)
        user_plan = Plan.objects.create(user=user_profile, gb=1, new_plan=True)

        # test_update user
        user = User.objects.create_superuser('existing_user', 'existing_user@dinhbuy.com', 'hello123')
        user_profile = UserProfile.objects.create(user=user)
        user_plan = Plan.objects.create(user=user_profile, sub_user_username='test_P5NB48bTV5', sub_user_password='K5W1QiZeKe', sub_user_id='1274840')

    # /api/sub-user/
    # Test for creating a subuser
    def test_create(self):
        # Find new user information
        print("\ntest_create(): Starting...")
        user = User.objects.get(username='new_user')
        user_profile = UserProfile.objects.get(user=user)
        user_plan = Plan.objects.get(user=user_profile)

        # Create subuser
        print("test_create(): Creating subuser")
        token, created = Token.objects.get_or_create(user=user)
        client = APIClient()
        client.login(username='new_user', password='hello123')
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        response = client.get('/api/sub-user/')
        self.assertEqual(response.status_code, 201, msg="test_update(): Failed to create new subuser")
        user_plan.refresh_from_db()


        # Generate token for authentication
        print("test_create(): Generating provider token")
        url = "https://residential-api.oxylabs.io/v1/login"
        headers = {"Authorization": "Basic QktKS0NzWktsUzpQUFpTejN5dlRw"}
        response = requests.request("POST", url, headers=headers)
        oxylabs_token = json.loads(response.text)['token']


        # Check that subuser was created through provider
        print("test_create(): Checking provider backend")
        url = "https://residential.oxylabs.io/api/v1/users/{}/proxy-users/{}/".format(self.oxylab_user_id, user_plan.sub_user_id)
        payload = {
            "traffic_limit": float(user_plan.gb),
            "status": "active"
        }
        headers = {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": "JWT " + oxylabs_token
        }
        response = requests.request("PUT", url, json=payload, headers=headers)
        subuser = json.loads(response.text)
        self.assertEqual(subuser['username'], user_plan.sub_user_username, "test_create(): Incorrect subuser username")
        self.assertEqual(subuser['traffic_limit'], float(user_plan.gb), "test_create(): Incorrect subuser traffic limit")
        self.assertEqual(subuser['auto_disable'], True, "test_create(): Incorrect subuser auto_disable boolean")

        # Delete subuser
        print("test_create(): Deleting newly created subuser")
        url = "https://residential.oxylabs.io/api/v1/users/{}/proxy-users/{}/".format(self.oxylab_user_id, user_plan.sub_user_id)
        headers = {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": "JWT " + oxylabs_token
        }
        response = requests.request("DELETE", url, headers=headers)
        self.assertEqual(response.status_code, 200, "test_create(): Unable to delete newly created subuser")

    # # /api/sub-user/
    # # Test for updating a subuser's plan
    def test_update(self):
        print("\ntest_update(): Starting...")
        # Update user information through the backend
        user = User.objects.get(username='existing_user')
        user_profile = UserProfile.objects.get(user=user)
        user_plan = Plan.objects.get(user=user_profile)
        user_plan.gb = 1
        user_plan.save()

        # Update the subuser
        print("test_update(): Updating the subuser")
        token, created = Token.objects.get_or_create(user=user)
        client = APIClient()
        client.login(username='existing_user', password='hello123')
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        response = client.get('/api/sub-user/')
        self.assertEqual(response.status_code, 200, msg="test_update(): Failed updating the subuser")
        
        # Generate token for authentication
        print("test_update(): Generating provider token")
        url = "https://residential-api.oxylabs.io/v1/login"
        headers = {"Authorization": "Basic QktKS0NzWktsUzpQUFpTejN5dlRw"}
        response = requests.request("POST", url, headers=headers)
        oxylabs_token = json.loads(response.text)['token']

        # Retrieve subusers information through provider
        print("test_update(): Checking provider backend")
        url = "https://residential.oxylabs.io/api/v1/users/{}/proxy-users/{}/".format(self.oxylab_user_id, user_plan.sub_user_id)
        payload = {
            "traffic_limit": float(user_plan.gb),
            "status": "active"
        }
        headers = {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": "JWT " + oxylabs_token
        }
        response = requests.request("PUT", url, json=payload, headers=headers)
        subuser = json.loads(response.text)
        self.assertEqual(subuser['traffic_limit'], user_plan.gb, "test_update(): Provider has incorrect traffic limit")

        # Reset back to original state in the provider API. Should work assuming previous tests passed
        print("test_update(): Reverting provider state")
        user_plan.gb = 2
        user_plan.save()
        response = client.get('/api/sub-user/')
        self.assertEqual(response.status_code, 200, "test_update(): Failed to update traffic limit back to original state")