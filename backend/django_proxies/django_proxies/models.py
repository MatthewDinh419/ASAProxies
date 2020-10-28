from django.db import models
from django.conf import settings
from django_countries.fields import CountryField
from plan.models import Plan

RESI_PLANS = (
    ('1GB RESI PLAN', "1GB RESI PLAN"),
    ('2GB RESI PLAN', "2GB RESI PLAN"),
    ('4GB RESI PLAN', "4GB RESI PLAN")
)

class Item(models.Model):
    title = models.CharField(choices=RESI_PLANS, max_length=14)
    price = models.FloatField()
    gb = models.IntegerField(default=0)
    # discount_price = models.FloatField(blank=True, null=True)
    # category = models.CharField(choices=CATEGORY_CHOICES, max_length=2) resi or dc
    # label = models.CharField(choices=LABEL_CHOICES, max_length=1)

    def __str__(self):
        return self.title

class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    curr_plan = models.OneToOneField(Plan, on_delete=models.CASCADE, blank=True, null=True)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    one_click_purchasing = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    street_address = models.CharField(max_length=100)
    apartment_address = models.CharField(max_length=100)
    country = CountryField(multiple=False)
    zip = models.CharField(max_length=100)
    default = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural = 'Addresses'

class Coupon(models.Model):
    code = models.CharField(max_length=15)
    amount = models.FloatField()
    quantity = models.FloatField(default=0)
    valid = models.BooleanField(default=False)

    def __str__(self):
        return self.code

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    ref_code = models.CharField(max_length=20, blank=True, null=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    ordered_date = models.DateTimeField(auto_now_add=True)
    payment = models.ForeignKey('Payment', on_delete=models.SET_NULL, blank=True, null=True)
    coupon = models.ForeignKey('Coupon', on_delete=models.SET_NULL, blank=True, null=True)
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
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username