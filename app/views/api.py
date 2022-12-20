from datetime import datetime

import slack
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.utils.encoding import smart_str
from django.utils.http import urlsafe_base64_decode
from django.views.generic import TemplateView
from rest_framework import generics, status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from slack.signature.verifier import SignatureVerifier
from waffle import get_waffle_switch_model

from app import models, serializers
from app.views import mixins
from project.settings import SLACK_ATTENDACE_CHANNEL, SLACK_SIGNING_SECRET, SLACK_TOKEN

client = slack.WebClient(token=SLACK_TOKEN)


@method_decorator(login_required, name="dispatch")
class HomeView(TemplateView):
    template_name = "app/api/home.html"


class EmployeeViewSet(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):

    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.all()

    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.EmployeeListSerializer
        if self.action == "partial_update":
            return serializers.EmployeeUpdateSerializer
        return self.serializer_class

    @transaction.atomic
    def perform_destroy(self, instance):
        user = get_object_or_404(models.User, employee=instance)
        user.delete()
        return super().perform_destroy(instance)


class CompensationViewSet(mixins.PrivateApiMixin, ModelViewSet):
    serializer_class = serializers.CompensationSerializer
    queryset = models.Compensation.objects.all()
    module = models.Module.ModuleType.EMPLOYEES

    def get_object(self):
        return get_object_or_404(
            models.Compensation,
            employee_id=self.kwargs["pk"],
            employee__organization=self.request.user.organization,
        )

    def perform_create(self, serializer):
        serializer.save(employee_id=self.kwargs["pk"])


class DocumentViewSet(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.DocumentSerializer
    module = models.Module.ModuleType.EMPLOYEES

    def get_queryset(self):
        return models.Document.objects.filter(
            employee_id=self.kwargs["pk"],
            employee__organization=self.request.user.organization,
        )

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


class InstitueApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.InstitueSerializer
    queryset = models.Institute.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class ProgramApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.ProgramSerializer
    queryset = models.Program.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class CompanyApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class BenefitApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.BenefitSerializer
    queryset = models.Benefit.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class DepartmentApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.DepartmentSerializer
    queryset = models.Department.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class EmployeementTypeApiView(
    mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin
):
    serializer_class = serializers.EmployeementTypeSerializer
    queryset = models.EmploymentType.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class CompensationTypeApiView(
    mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin
):
    serializer_class = serializers.CompensationTypeSerializer
    queryset = models.CompensationType.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class CompensationScheduleApiView(
    mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin
):
    serializer_class = serializers.CompensationScheduleSerializer
    queryset = models.CompensationSchedule.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class CurrencyApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.CurrencySerializer
    queryset = models.Currency.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class AssetTypeApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.AssetTypeSerializer
    queryset = models.AssetType.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class DocumentTypeApiView(
    mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin
):
    serializer_class = serializers.DocumentTypeSerializer
    queryset = models.DocumentType.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class RoleApiView(mixins.PrivateApiMixin, ListAPIView, mixins.OrganizationMixin):
    serializer_class = serializers.RoleSerializer
    queryset = models.Role.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class WaffleApiView(APIView):
    def get(self, request, *args, **kwargs):
        switches = get_waffle_switch_model().get_all()
        switche_serializer = serializers.WaffleSerializer(switches, many=True)
        response = []
        for x in switche_serializer.data:
            response.append({x.get("name"): x.get("active")})
        return Response(response)


class SlackApiView(APIView):
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        req = SignatureVerifier(SLACK_SIGNING_SECRET)
        if req.is_valid(
            request.body,
            request.headers.get("X-Slack-Request-Timestamp"),
            request.headers.get("X-Slack-Signature"),
        ):
            try:
                channel_id = request.data.get("channel_id")
                user_id = request.data.get("user_id")
                command = request.data.get("command")

                if channel_id == SLACK_ATTENDACE_CHANNEL:
                    try:
                        employee = models.Employee.objects.get(slack_id=user_id)
                    except models.Employee.DoesNotExist:
                        user = client.users_profile_get(user=user_id)
                        employee = models.Employee.objects.get(
                            user__email=user.get("profile").get("email")
                        )

                        employee.slack_id = user_id

                        employee.save()

                    last_record = models.Attendance.objects.filter(
                        employee=employee
                    ).last()

                    if command == "/timein":
                        if last_record and last_record.time_out is None:
                            return Response(
                                data={
                                    "text": "Please do time out before timing in.",
                                },
                                status=status.HTTP_200_OK,
                            )

                        attendance = models.Attendance.objects.create(
                            employee=employee, organization=employee.organization
                        )

                    elif command == "/timeout":
                        if last_record and last_record.time_out is not None:
                            return Response(
                                data={
                                    "text": "Please do time in before timing out.",
                                },
                                status=status.HTTP_200_OK,
                            )
                        attendance = models.Attendance.objects.filter(
                            employee=employee
                        ).last()
                        attendance.time_out = datetime.now()
                        attendance.save()

                    return Response(
                        data={"response_type": "in_channel"},
                        status=status.HTTP_200_OK,
                    )

                return Response(
                    data={
                        "text": "Please use this command in attendance channel",
                    },
                    status=status.HTTP_200_OK,
                )
            except Exception:
                return Response(
                    data={
                        "text": "Something went wrong. Please try again.",
                    },
                    status=status.HTTP_200_OK,
                )

        return Response(
            data={
                "detail": "Forbidden",
            },
            status=status.HTTP_403_FORBIDDEN,
        )


class AttendanceViewSet(mixins.PrivateApiMixin, ListAPIView, mixins.OrganizationMixin):
    serializer_class = serializers.AttendanceSerializer
    queryset = models.Attendance.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class EmployeeInvitationConfirmView(generics.GenericAPIView):
    serializer_class = serializers.EmployeeInvitationConfirmSerializer
    queryset = models.User.objects.all()
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        uidb64 = serializer.validated_data["uidb64"]
        token = serializer.validated_data["token"]

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = models.User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {"token_valid": False}, status=status.HTTP_400_BAD_REQUEST
                )

            return Response({"token_valid": True}, status=status.HTTP_200_OK)

        except Exception:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return Response(
                        {"token_valid": False}, status=status.HTTP_400_BAD_REQUEST
                    )

            except Exception:
                return Response(
                    {"token_valid": False}, status=status.HTTP_400_BAD_REQUEST
                )


class EmployeeInvitationPasswordUpdateCompleteView(generics.GenericAPIView):
    serializer_class = serializers.EmployeeInvitationPasswordCompleteSerializer
    queryset = models.User.objects.all()
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        uidb64 = serializer.validated_data["uidb64"]
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = models.User.objects.get(id=id)
            user.set_password(serializer.validated_data["password"])
            user.save()
        except Exception:
            return Response(
                {"status": "account record not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"status": "password reset success"},
            status=status.HTTP_200_OK,
        )
