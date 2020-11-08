from django.contrib import admin
from .models import Plan
from django_proxies.models import (
    Order,
    Item,
    UserProfile,
    Payment,
    Coupon,
    Stock
)
# Register your models here.
admin.site.register(Plan)
admin.site.register(Order)
admin.site.register(Item)
admin.site.register(UserProfile)
admin.site.register(Payment)
admin.site.register(Coupon)
admin.site.register(Stock)
