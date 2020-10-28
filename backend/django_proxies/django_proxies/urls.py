from django.conf.urls import url, include
from django.contrib import admin
from .views import (
    PaymentView,
    AddCouponView,
)

urlpatterns = [
    url(r'api-auth/',include('rest_framework.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'api/', include('plan.api.urls')),
    url(r'add-coupon/', AddCouponView.as_view(), name='add-coupon'),
    url(r'checkout/', PaymentView.as_view(), name='checkout'),
]
