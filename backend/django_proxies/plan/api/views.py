from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
from plan.models import Plan
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PlanSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.core import serializers
import json
import requests
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED

class PlanListView(ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

    def get_queryset(self, *args, **kwargs):
        if(not self.request.user.is_authenticated):
            return Response("User is not authenticated", status=status.HTTP_401_UNAUTHORIZED)
        num_results = Plan.objects.filter(user = self.request.user).count()
        if (num_results >= 1): #if user already has an existing plan
            dupl_obj = Plan.objects.filter(user=self.request.user)
            return dupl_obj
        return Response("User does not have a plan", status=status.HTTP_404_NOT_FOUND)

class PlanCreateView(CreateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

    def perform_create(self, serializer):
        curr_user = Token.objects.get(key=self.request.data['auth_token']).user
        num_results = Plan.objects.filter(user = curr_user).count()
        if (num_results >= 1): #if user already has an existing plan
            dupl_obj = Plan.objects.get(user=curr_user)
            dupl_obj.gb = dupl_obj.gb + self.request.data['gb']
            dupl_obj.save()
        else: #otherwise create a new plan for the user
            serializer.save(user=curr_user)

class PlanUpdateView(UpdateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
