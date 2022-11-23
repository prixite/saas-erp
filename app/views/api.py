from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework.generics import RetrieveAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from app import models, serializers, permissions
from app.views import mixins


@method_decorator(login_required, name="dispatch")
class HomeView(TemplateView):
    template_name = "app/api/home.html"


class EmployeeViewSet(ModelViewSet, mixins.OrganizationMixin):

    permission_classes = [permissions.OwnerPermission]
    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.all()
    pagination_class = LimitOffsetPagination

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.EmployeeListSerializer

        if self.action == "partial_update":
            return serializers.EmployeeUpdateSerializer

        return super().get_serializer_class()


class CompensationViewSet(ModelViewSet):
    serializer_class = serializers.CompensationSerializer

    def get_queryset(self):
        return models.Compensation.objects.none

    def get_object(self):
        return models.Compensation.objects.get(employee=self.kwargs["pk"])


class DocumentViewSet(ModelViewSet):
    serializer_class = serializers.DocumentSerializer

    def get_queryset(self):
        return models.Document.objects.filter(employee_id=self.kwargs["pk"])

    def perform_create(self, serializer):
        serializer.save(employee_id=self.kwargs["pk"])


class MeApiView(RetrieveAPIView):
    serializer_class = serializers.MeSerializer

    def get_object(self):
        return self.request.user


class InstitueApiView(ModelViewSet, mixins.OrganizationMixin):
    permission_classes = [permissions.OwnerPermission]
    serializer_class = serializers.InstitueSerializer
    queryset = models.Institute.objects.all()


class ProgramApiView(ModelViewSet, mixins.OrganizationMixin):
    permission_classes = [permissions.OwnerPermission]
    serializer_class = serializers.ProgramSerializer
    queryset = models.Program.objects.all()


class DegreeApiView(ModelViewSet):
    permission_classes = [permissions.OwnerPermission]
    serializer_class = serializers.DegreeSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Degree.objects.all()
        return models.Degree.objects.filter(
            employee__organization=self.request.user.organization
        )


class CompanyApiView(ModelViewSet, mixins.OrganizationMixin):
    permission_classes = [permissions.OwnerPermission]
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.all()


class ExperienceApiView(ModelViewSet):
    permission_classes = [permissions.OwnerPermission]
    serializer_class = serializers.ExperirenceSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Experience.objects.all()
        return models.Experience.objects.filter(
            employee__organization=self.request.user.organization
        )


class BenefitApiView(ModelViewSet, mixins.OrganizationMixin):
    permission_classes = [permissions.OwnerPermission]
    serializer_class = serializers.BenefitSerializer
    queryset = models.Benefit.objects.all()


class DepartmentApiView(ModelViewSet, mixins.OrganizationMixin):
    permission_classes = [permissions.OwnerPermission]
    serializer_class = serializers.DepartmentSerializer
    queryset = models.Department.objects.all()


class EmployeementType(ModelViewSet, mixins.OrganizationMixin):
    permission_classes = [permissions.OwnerPermission]
    serializer_class = serializers.EmployeementTypeSerializer
    queryset = models.EmploymentType.objects.all()
