from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt
from allauth.account.views import confirm_email
from .views import (
    ChangePasswordView,
    VerifyInfoView,
    PlanCreateView,
    PlanUpdateView,
    PlanListView,
    SubuserView,
    GenerateProxiesView,
    SubUserTrafficView,
    PaymentHistoryView,
    PaymentRedirectView,
    StripeWebhookView,
    ResendEmailConfirmationView
)

urlpatterns = [
    url(r'^', include('django.contrib.auth.urls')),
    url(r'api-auth/',include('rest_framework.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'api/', include('plan.api.urls')),
    url(r'api/change-password/', ChangePasswordView.as_view(), name='change-password'),
    url(r'api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    url(r'api/verify-info/', VerifyInfoView.as_view()),
    url(r'api/plans/create/', PlanCreateView.as_view()),
    url(r'api/plans/update/<pk>/', PlanUpdateView.as_view()),
    url(r'api/plans/list/', PlanListView.as_view()),
    url(r'api/sub-user/', SubuserView.as_view()),
    url(r'api/create-proxies/', GenerateProxiesView.as_view()),
    url(r'api/sub-user-traffic/', SubUserTrafficView.as_view()),
    url(r'api/payment-history/', PaymentHistoryView.as_view()),
    url(r'api/create-checkout-session/', PaymentRedirectView.as_view()),
    url(r'api/webhook/', StripeWebhookView.as_view()),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
    url(r'^api/resend-email/', ResendEmailConfirmationView.as_view()),
]
