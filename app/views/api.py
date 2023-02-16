import json
from datetime import datetime

import requests
import slack
from django.conf import settings
from django.contrib.auth import authenticate, login, update_session_auth_hash
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.db import transaction
from django.db.models.deletion import ProtectedError
from django.middleware import csrf
from django.shortcuts import get_object_or_404
from django.utils.encoding import smart_bytes, smart_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.views.generic import TemplateView
from rest_framework import generics, status
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from slack.signature.verifier import SignatureVerifier
from waffle import get_waffle_switch_model

from app import models, serializers
from app.utils import create_presigned_url, send_email_forget_password, send_leave_email
from app.views import mixins
from project.settings import SLACK_ATTENDACE_CHANNEL, SLACK_SIGNING_SECRET, SLACK_TOKEN

client = slack.WebClient(token=SLACK_TOKEN)


class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.LoginSerializer

    def post(self, request, format=None):
        data = self.request.data

        email = data["email"]
        password = data["password"]

        try:
            user = authenticate(email=email, password=password)

            if user is not None:
                login(request, user)
                return Response(
                    {"detail": "User authenticated", "csrf": csrf.get_token(request)}
                )
            else:
                return Response(
                    {"detail": "Wrong email or password"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception:
            return Response(
                {"detail": "Something went wrong when logging in"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class PasswordResetEmailView(generics.GenericAPIView):
    serializer_class = serializers.ResendEmailCodeSerializer
    queryset = models.User.objects.all()
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = models.User.objects.get(email=serializer.validated_data["email"])
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            password_reset_url = (
                f"{settings.DOMAIN_NAME}/reset-password/?uidb64={uidb64}&token={token}"
            )
            try:
                send_email_forget_password(
                    {
                        "password_reset_url": password_reset_url,
                        "to_email": user.email,
                        "user": user,
                    },
                )
                return Response(
                    {"status": "Password reset link sent"},
                    status=status.HTTP_200_OK,
                )
            except Exception:
                return Response(
                    {"status": "Something went wrong"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except models.User.DoesNotExist:
            return Response(
                {"error": "Account record not found."},
                status=status.HTTP_404_NOT_FOUND,
            )


class PasswordResetConfirmView(generics.GenericAPIView):
    serializer_class = serializers.PasswordResetConfirmSerializer
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


class PasswordResetCompleteView(generics.GenericAPIView):
    serializer_class = serializers.PasswordResetCompleteSerializer
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
                {"status": "Account record not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"status": "Password reset success"},
            status=status.HTTP_200_OK,
        )


class HomeView(TemplateView):
    template_name = "app/api/home.html"


class EmployeeViewSet(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):

    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.all()

    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.EmployeeListSerializer
        if self.action == "update":
            return serializers.EmployeeUpdateSerializer
        return self.serializer_class

    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance.user == self.request.user:
            user = get_object_or_404(models.User, employee=instance)
            user.soft_delete()
        instance.soft_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as protected_error:
            protected_elements = [
                protected_object
                for protected_object in protected_error.protected_objects
            ]
            response_data = {
                "detail": f"Can not delete this institute as this is used by {protected_elements[0]}."  # noqa
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response_data = {"detail": f"An error occurred: {e}"}
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


class ProgramApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.ProgramSerializer
    queryset = models.Program.objects.all()
    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as protected_error:
            protected_elements = [
                protected_object
                for protected_object in protected_error.protected_objects
            ]
            response_data = {
                "detail": f"Can not delete this program as this is used by {protected_elements[0]}."  # noqa
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response_data = {"detail": f"An error occurred: {e}"}
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


class CompanyApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.all()
    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as protected_error:
            protected_elements = [
                protected_object
                for protected_object in protected_error.protected_objects
            ]
            response_data = {
                "detail": f"Can not delete this company as this is used by {protected_elements[0]}."  # noqa
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response_data = {"detail": f"An error occurred: {e}"}
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


class BenefitApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.BenefitSerializer
    queryset = models.Benefit.objects.all()
    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context


class DepartmentApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.DepartmentSerializer
    queryset = models.Department.objects.all()
    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as protected_error:
            protected_elements = [
                protected_object
                for protected_object in protected_error.protected_objects
            ]
            response_data = {
                "detail": f"Can not delete this department as this is used by {protected_elements[0]}."  # noqa
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response_data = {"detail": f"An error occurred: {e}"}
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


class EmployeementTypeApiView(
    mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin
):
    serializer_class = serializers.EmployeementTypeSerializer
    queryset = models.EmploymentType.objects.all()
    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as protected_error:
            protected_elements = [
                protected_object
                for protected_object in protected_error.protected_objects
            ]
            response_data = {
                "detail": f"Can not delete this employment type as this is used by {protected_elements[0]}."  # noqa
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response_data = {"detail": f"An error occurred: {e}"}
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


class CompensationTypeApiView(
    mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin
):
    serializer_class = serializers.CompensationTypeSerializer
    queryset = models.CompensationType.objects.all()
    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as protected_error:
            protected_elements = [
                protected_object
                for protected_object in protected_error.protected_objects
            ]
            response_data = {
                "detail": f"Can not delete this module as this is used by {protected_elements[0]}."  # noqa
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response_data = {"detail": f"An error occurred: {e}"}
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


class CompensationScheduleApiView(
    mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin
):
    serializer_class = serializers.CompensationScheduleSerializer
    queryset = models.CompensationSchedule.objects.all()
    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as protected_error:
            protected_elements = [
                protected_object
                for protected_object in protected_error.protected_objects
            ]
            response_data = {
                "detail": f"Can not delete this module as this is used by {protected_elements[0]}."  # noqa
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response_data = {"detail": f"An error occurred: {e}"}
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


class CurrencyApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.CurrencySerializer
    queryset = models.Currency.objects.all()
    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as protected_error:
            protected_elements = [
                protected_object
                for protected_object in protected_error.protected_objects
            ]
            response_data = {
                "detail": f"Can not delete thi object as this is used by {protected_elements[0]}."  # noqa
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response_data = {"detail": f"An error occurred: {e}"}
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


class AssetTypeApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.AssetTypeSerializer
    queryset = models.AssetType.objects.all()
    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context


class DocumentTypeApiView(
    mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin
):
    serializer_class = serializers.DocumentTypeSerializer
    queryset = models.DocumentType.objects.all()
    module = models.Module.ModuleType.EMPLOYEES

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context


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
                command_params = request.data.get("text")
                get_detail = command_params.split("/")
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

                    if command == "/erp":
                        if get_detail[0] == "timein":
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

                        elif get_detail[0] == "timeout":
                            if last_record and last_record.time_out is not None:
                                return Response(
                                    data={
                                        "text": "Please do time in before 'timing' out.",  # noqa
                                    },
                                    status=status.HTTP_200_OK,
                                )
                            attendance = models.Attendance.objects.filter(
                                employee=employee
                            ).last()
                            attendance.time_out = datetime.now()
                            attendance.save()
                        elif get_detail[0] == "help":
                            return Response(
                                data={
                                    "text": "Here are some ideas for you: :wave: :\n*Time In*\n  `/erp timein | Use this command to mark attendance time in.`\n\n*Time Out*\n  `/erp timeout | Use this command to mark attendance time out.` \n\n*leave*\n  `/erp leave/From_Date/To_Date/Reason | Use this command to submit a leave request.`",  # noqa
                                },
                                status=status.HTTP_200_OK,
                            )
                        elif get_detail[0] == "leave":

                            date_format = "%Y-%m-%d"

                            try:
                                date_from = datetime.strptime(
                                    get_detail[1], date_format
                                )
                                date_to = datetime.strptime(get_detail[2], date_format)
                                total_leave = date_to - date_from
                                remaining_leave = 20 - employee.leave_count

                                if (
                                    date_from < datetime.now()
                                    or date_to < datetime.now()
                                ):
                                    return Response(
                                        data={"text": "Date must be future date."}
                                    )

                                if total_leave.days > remaining_leave:
                                    return Response(
                                        data={
                                            "text": f"Your remaining leaves ({remaining_leave}) are less then requested leaves."  # noqa
                                        }
                                    )
                                if date_from > date_to:
                                    return Response(
                                        data={
                                            "text": """You submitted an invalid leave request. Please note that the correct format for leave request is: /erp leave/From_Date/To_Date/Reason"""  # noqa
                                        }
                                    )

                                models.Leave.objects.create(
                                    employee_id=employee.id,
                                    leave_from=get_detail[1],
                                    leave_to=get_detail[2],
                                    description=get_detail[3],
                                    organization=employee.organization,
                                )
                                return Response(
                                    data={
                                        "text": "Leave request submitted successfully"
                                    },
                                    status=status.HTTP_201_CREATED,
                                )

                            except Exception as e:
                                print(e)
                                return Response(
                                    data={
                                        "text": """You submitted an invalid leave request. Please note that the correct format for leave request is: /erp leave/YYYY-MM-DD/YYYY-MM-DD/Reason"""  # noqa
                                    },
                                    status=status.HTTP_201_CREATED,
                                )
                        else:
                            return Response(
                                data={
                                    "text": ":no_entry_sign: *Invalid Command* \n Please use this command for help.`/erp help`"  # noqa
                                },
                                status=status.HTTP_201_CREATED,
                            )
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
            except Exception as e:
                print(e)
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


class MeUpdateViewSet(UpdateAPIView):
    serializer_class = serializers.MeUpdateSerializer
    queryset = models.User.objects.none()
    http_method_names = ("put",)

    def get_object(self):
        return self.request.user


class MeUpdateNotificationViewSet(UpdateAPIView):
    serializer_class = serializers.MeUpdateNotificationSerializer
    queryset = models.User.objects.none()
    http_method_names = ("put",)

    def get_object(self):
        return self.request.user


class LeaveView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.LeaveSerializer
    queryset = models.Leave.objects.all()
    module = models.Module.ModuleType.LEAVE

    def get_serializer_class(self):
        if self.action == "partial_update":
            return serializers.LeaveUpdateSerializer
        return self.serializer_class

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        leave = get_object_or_404(models.Leave, pk=kwargs.get("pk"))
        employee = get_object_or_404(models.Employee, pk=leave.employee.id)
        updated_by = get_object_or_404(models.User, email=request.user.email)
        total_leave = leave.leave_to - leave.leave_from
        if request.data["status"] == models.Leave.LeaveStatus.APPROVED:
            employee.leave_count += total_leave.days
        leave.updated_by = updated_by
        leave.leave_type = request.data.get("type")
        employee.save()
        leave.save()
        response = super().update(request, *args, **kwargs)
        send_leave_email(
            request.data["status"],
            employee,
            updated_by,
            leave.leave_from,
            leave.leave_to,
            leave.hr_comment,
        )
        return response


class OwnerOnboardingAPIView(CreateAPIView):
    serializer_class = serializers.OwnerOnBoardingSerializer
    queryset = models.User.objects.all()
    permission_classes = (AllowAny,)


class OrganizationViewSet(mixins.PrivateApiMixin, ModelViewSet):

    allow_superuser = True
    serializer_class = serializers.OrganizationSerializer
    queryset = models.Organization.objects.all()

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as protected_error:
            protected_elements = [
                protected_object
                for protected_object in protected_error.protected_objects
            ]
            response_data = {
                "detail": f"Can not delete this object as this is used by {protected_elements[0]}."  # noqa
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response_data = {"detail": f"An error occurred: {e}"}
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


class OrganizationModuleViewSet(mixins.PrivateApiMixin, ModelViewSet):

    allow_superuser = True
    serializer_class = serializers.OrganizationModuleSerializer
    queryset = models.OrganizationModule.objects.all()


class ModuleViewSet(mixins.PrivateApiMixin, ModelViewSet):
    allow_superuser = True
    serializer_class = serializers.ModuleSerializer
    queryset = models.Module.objects.all()

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as protected_error:
            protected_elements = [
                protected_object
                for protected_object in protected_error.protected_objects
            ]
            response_data = {
                "detail": f"Can not delete this module as this is used by {protected_elements[0]}."  # noqa
            }
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response_data = {"detail": f"An error occurred: {e}"}
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


class StandupViewSet(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.StandupSerializer
    queryset = models.Standup.objects.all()
    module = models.Module.ModuleType.STANDUP

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context

    def get_team_members(self, request, *args, **kwargs):
        standup = self.get_object()
        members = standup.team.members.all()
        serializer = serializers.EmployeeListSerializer(members, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        if self.module in [x.slug for x in self.request.user.member_modules]:
            teams = self.request.user.employee.teams.all()
            return super().get_queryset().filter(team__in=teams)
        return super().get_queryset()


class StandupUpdateViewSet(
    mixins.PrivateMixinAPI, ModelViewSet, mixins.OrganizationMixin
):
    serializer_class = serializers.StandupUpdateSerializer
    queryset = models.StandupUpdate.objects.all()
    module = models.Module.ModuleType.STANDUP

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        context.update({"module": self.module})
        return context

    def get_queryset(self):
        if self.module in [x.slug for x in self.request.user.member_modules]:
            teams = self.request.user.employee.teams.all()
            standups = models.Standup.objects.filter(team__in=teams)
            return super().get_queryset().filter(standup__in=standups)
        return super().get_queryset()


class TeamViewSet(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.TeamSerializer
    queryset = models.Team.objects.all()
    module = models.Module.ModuleType.STANDUP

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"organization": self.request.user.organization})
        return context


class ModuleFilterViewSet(
    mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin
):
    serializer_class = serializers.ModuleSerializer
    module = models.Module.ModuleType.USER

    def get_queryset(self):
        return models.Module.objects.filter(
            id__in={x.id for x in self.request.user.organization_modules}
        )


class UserViewSet(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.UserSerializer
    module = models.Module.ModuleType.USER

    def get_queryset(self):
        return models.User.objects.filter(organization=self.request.user.organization)

    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance == self.request.user:
            return Response(
                {"detail": "Can not delete self user"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            emp = models.Employee.objects.get(user=instance)
            emp.soft_delete()
        except models.Employee.DoesNotExist:
            pass
        instance.soft_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserModuleRoleViewSet(mixins.PrivateApiMixin, ModelViewSet):
    serializer_class = serializers.UserModuleRoleSerializer
    module = models.Module.ModuleType.USER

    def get_queryset(self):
        return models.UserModuleRole.objects.filter(
            user__organization=self.request.user.organization
        )

    def list(self, request, *args, **kwargs):
        user = get_object_or_404(models.User, id=kwargs.get("pk"))
        modules = models.UserModuleRole.objects.filter(user=user)
        serializer = serializers.UserModuleRoleSerializer(modules, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        context.update({"user_id": self.kwargs.get("pk")})
        return context


class AvailabilityViewSet(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.data.get("payload"))
            user_id = data.get("user").get("id")
            sending_time = datetime.fromtimestamp(
                int(float(data.get("message").get("ts")))
            )
            response_time = datetime.fromtimestamp(
                int(float(data.get("actions")[0].get("action_ts")))
            )
            time_diff = int(round((response_time - sending_time).total_seconds() / 60))

            if time_diff < 10:
                try:
                    employee = models.Employee.objects.get(slack_id=user_id)
                except models.Employee.DoesNotExist:
                    user = client.users_profile_get(user=user_id)
                    employee = models.Employee.objects.get(
                        user__email=user.get("profile").get("email")
                    )
                    employee.slack_id = user_id
                    employee.save()

                employee.weekly_available_hours = (
                    employee.weekly_available_hours + 1
                    if employee.weekly_available_hours
                    else 1
                )
                employee.monthly_available_hours = (
                    employee.monthly_available_hours + 1
                    if employee.monthly_available_hours
                    else 1
                )
                employee.availability_last_msg = data.get("actions")[0].get("value")
                employee.save()
                requests.post(
                    data.get("response_url"),
                    json={
                        "replace_original": "true",
                        "text": "Thanks for your response.",
                    },
                )
        except Exception as e:
            print(e)
        return Response()


class AwsApiView(APIView):
    def get(self, request, *args, **kwargs):
        response = create_presigned_url(
            settings.AWS_STORAGE_BUCKET_NAME, settings.AWS_SECRET_ACCESS_KEY
        )
        return Response({"aws_url": response}, status=status.HTTP_200_OK)
