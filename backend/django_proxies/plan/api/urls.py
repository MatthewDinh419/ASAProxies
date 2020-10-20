from django.urls import path
from .views import PlanCreateView, PlanUpdateView, PlanListView

urlpatterns = [
    path('plans/create/', PlanCreateView.as_view()),
    path('plans/update/<pk>/', PlanUpdateView.as_view()),
    path('plans/list/', PlanListView.as_view())
]