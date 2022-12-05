from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from waffle import get_waffle_switch_model
from django.db import transaction
from django.shortcuts import get_object_or_404
from datetime import datetime

import pprint

from app import models, serializers
from project.settings import SLACK_TOKEN, SLACK_SIGNING_SECRET

import slack
from slackeventsapi import SlackEventAdapter

slack_enevt_adapter = SlackEventAdapter(SLACK_SIGNING_SECRET, "/api/slack/events/")

client = slack.WebClient(token=SLACK_TOKEN)
# client = slack.WebClient(token="SLACK_TOKEN")


@method_decorator(login_required, name="dispatch")
class HomeView(TemplateView):
    template_name = "app/api/home.html"


class EmployeeViewSet(ModelViewSet):
    serializer_class = serializers.EmployeeSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.EmployeeListSerializer

        return super().get_serializer_class()

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Employee.objects.all()
        return models.Employee.objects.filter(
            organization=self.request.user.organization
        )


class CompensationViewSet(ModelViewSet):
    serializer_class = serializers.CompensationSerializer
    queryset = models.Compensation.objects.all()

    def get_object(self):
        return get_object_or_404(models.Compensation, employee_id=self.kwargs["pk"])

    def perform_create(self, serializer):
        serializer.save(employee_id=self.kwargs["pk"])


class DocumentViewSet(ModelViewSet):
    serializer_class = serializers.DocumentSerializer

    def get_queryset(self):
        return models.Document.objects.filter(employee_id=self.kwargs["pk"])

    def perform_create(self, serializer):
        serializer.save(employee_id=self.kwargs["pk"])

    def create(self, request, *args, **kwargs):
        get_object_or_404(models.Employee, id=kwargs.get("pk"))
        return super().create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        get_object_or_404(models.Employee, id=kwargs.get("pk"))
        data = super().list(request, *args, **kwargs)
        res = []
        doc_types = [doc.get("type") for doc in data.data]
        for type in set(doc_types):
            res.append(
                {
                    "type": type if type else "Others",
                    "docs": list(
                        filter(lambda doc: doc.get("type") == type, data.data)
                    ),
                }
            )
        return Response(res)


class MeApiView(RetrieveAPIView):
    serializer_class = serializers.MeSerializer

    def get_object(self):
        return self.request.user


class UserPasswordViewSet(ModelViewSet):
    serializer_class = serializers.UserPasswordSerializer

    def get_queryset(self):
        return models.User.objects.filter(id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, partial=kwargs["partial"])
        if serializer.is_valid(raise_exception=True):
            request.user.set_password(serializer.data["password"])
            request.user.save()
            update_session_auth_hash(request, request.user)
        return Response(serializer.errors)


class WaffleApiView(APIView):
    def get(self, request, *args, **kwargs):
        switches = get_waffle_switch_model().get_all()
        switche_serializer = serializers.WaffleSerializer(switches, many=True)
        return Response(switche_serializer.data)


class SlackApiView(APIView):
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        pprint.pprint(request.data)
        slack_id = request.data.get("event").get("user")
        try:
            employee1 = models.Employee.objects.get(slack_id=slack_id)
            # print("I found employee:::::::", employee1)
        except models.Employee.DoesNotExist:
            user_info = client.users_info(user=slack_id)
            employee = get_object_or_404(
                models.Employee,
                user__email=user_info.get("user").get("profile").get("email"),
            )
            employee.slack_id = slack_id
            employee.save()
            # print("I found user:::::::", employee)

        return Response(request.data.get("challenge"))
