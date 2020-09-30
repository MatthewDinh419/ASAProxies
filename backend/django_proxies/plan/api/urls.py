from django.urls import path
from .views import PlanCreateView, PlanUpdateView

urlpatterns = [
    path('create/', PlanCreateView.as_view()),
    path('update/<pk>/', PlanUpdateView.as_view()),
]