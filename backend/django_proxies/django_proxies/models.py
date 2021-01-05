from django.db import models
from django.conf import settings
from django_countries.fields import CountryField
import string
import random
import datetime
RESI_PLANS = (
    ('1GB RESI PLAN', "1GB RESI PLAN"),
    ('2GB RESI PLAN', "2GB RESI PLAN"),
    ('4GB RESI PLAN', "4GB RESI PLAN")
)
        
class Plan(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('UserProfile',on_delete=models.CASCADE)
    sub_user_username = models.CharField(max_length=25, blank=True, null=True)
    sub_user_password = models.CharField(max_length=25, blank=True, null=True)
    sub_user_id = models.CharField(max_length=25, blank=True, null=True)
    gb = models.IntegerField(default=0)
    used = models.DecimalField(max_digits=2, decimal_places=2, default=0.00)
    sub_user_date = models.DateTimeField(auto_now_add=True)
    new_plan = models.BooleanField(default=False)

    def __str__(self):
        return self.user.user.email

    def generateInfo(self, length):
        letters_and_digits = string.ascii_letters + string.digits
        result_str = ''.join((random.choice(letters_and_digits) for i in range(length)))
        return result_str

    def currentTime(self):
        return datetime.datetime.now()

class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    curr_plan = models.OneToOneField(Plan, on_delete=models.CASCADE, blank=True, null=True)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    one_click_purchasing = models.BooleanField(default=False)
    def __str__(self):
        return self.user.email

class Stock(models.Model):
    current_stock = models.IntegerField(default=0)
    valid = models.BooleanField(default=False)

    def __str__(self):
        return str(self.current_stock)

class Item(models.Model):
    title = models.CharField(choices=RESI_PLANS, max_length=14)
    price = models.FloatField()
    gb = models.IntegerField(default=0)
    ordered_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    street_address = models.CharField(max_length=100)
    apartment_address = models.CharField(max_length=100)
    country = CountryField(multiple=False)
    zip = models.CharField(max_length=100)
    default = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name_plural = 'Addresses'

class Order(models.Model):
    user = models.ForeignKey(UserProfile,
                             on_delete=models.CASCADE)
    ref_code = models.CharField(max_length=20, blank=True, null=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, blank=True, null=True)
    ordered_date = models.DateTimeField(auto_now_add=True)
    payment = models.ForeignKey('Payment', on_delete=models.SET_NULL, blank=True, null=True)
    refund_granted = models.BooleanField(default=False)

    def __str__(self):
        return self.ref_code
    def generate_ref_code(self):
        last_order = Order.objects.last()
        if not last_order:
            return "RES1"
        order_num_prev = last_order.ref_code
        new_order_int = int(order_num_prev.split('RES')[-1]) + 1
        new_order_num = 'RES' + str(new_order_int)
        return new_order_num
        
class Payment(models.Model):
    stripe_charge_id = models.CharField(max_length=50)
    user = models.ForeignKey(UserProfile,
                             on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.stripe_charge_id

class Analytic(models.Model):
    total_used = models.DecimalField(max_digits=2, decimal_places=2, default=0.00)
    total_purchased = models.IntegerField(default=0)

    def __str__(self):
        return str(self.total_used)