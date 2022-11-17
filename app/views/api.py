from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework.generics import RetrieveAPIView
from rest_framework.viewsets import ModelViewSet

from app import models, serializers, permissions


@method_decorator(login_required, name="dispatch")
class HomeView(TemplateView):
    template_name = "app/api/home.html"


class EmployeeViewSet(ModelViewSet):
    serializer_class = serializers.EmployeeSerializer

    permission_classes = [permissions.OwnerPermission]

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


class InstitueApiView(ModelViewSet):
    serializer_class = serializers.InstitueSerializer
    queryset = models.Institute.objects.all()


class ProgramApiView(ModelViewSet):
    serializer_class = serializers.ProgramSerializer
    queryset = models.Program.objects.all()


class DegreeApiView(ModelViewSet):
    serializer_class = serializers.DegreeSerializer
    queryset = models.Degree.objects.all()


class CompanyApiView(ModelViewSet):
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.all()


class ExperienceApiView(ModelViewSet):
    serializer_class = serializers.ExperirenceSerializer
    queryset = models.Experience.objects.all()


class BenefitApiView(ModelViewSet):
    serializer_class = serializers.BenefitSerializer
    queryset = models.Benefit.objects.all()
