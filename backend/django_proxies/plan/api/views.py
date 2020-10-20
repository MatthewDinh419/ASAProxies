from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView
from plan.models import Plan
from rest_framework import status
from rest_framework.response import Response
from .serializers import PlanSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.core import serializers
import json

class PlanListView(ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

    def post(self, request, *args, **kwargs):
        print(self.request.data)
        curr_user = Token.objects.get(key=self.request.data['auth_token']).user
        num_results = Plan.objects.filter(user = curr_user).count()
        if (num_results >= 1): #if user already has an existing plan
            dupl_obj = Plan.objects.filter(user=curr_user)
            return Response(serializers.serialize("python", dupl_obj) , status=status.HTTP_200_OK)
        return Response("User does not have a plan", status=status.HTTP_404_NOT_FOUND)

    # def get_queryset(self):
    #     # print(self.request.user)
    #     # num_results = Plan.objects.filter(user = self.request.user).count()
    #     # if (num_results >= 1): #if user already has an existing plan
    #     #     print("hello?")
    #     #     dupl_obj = Plan.objects.get(user=self.request.user)
    #     #     return dupl_obj.get_queryset()
    #     return "User does not have a plan"

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
