from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.db import transaction

from app import models, serializers
from app.views import mixins


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


class DegreeApiView(mixins.PrivateApiMixin, ModelViewSet):
    serializer_class = serializers.DegreeSerializer
    module = models.Module.ModuleType.EMPLOYEES

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Degree.objects.all()
        return models.Degree.objects.filter(
            employee__organization=self.request.user.organization
        )


class CompanyApiView(mixins.PrivateApiMixin, ModelViewSet, mixins.OrganizationMixin):
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.all()
    module = models.Module.ModuleType.EMPLOYEES


class ExperienceApiView(mixins.PrivateApiMixin, ModelViewSet):
    serializer_class = serializers.ExperirenceSerializer
    module = models.Module.ModuleType.EMPLOYEES

    def get_queryset(self):
        return models.Experience.objects.filter(
            employee__organization=self.request.user.organization
        )


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
