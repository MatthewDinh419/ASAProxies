from django.urls import path
from .views import PlanCreateView, PlanUpdateView

urlpatterns = [
    path('plans/create/', PlanCreateView.as_view()),
    path('plans/update/<pk>/', PlanUpdateView.as_view()),
]