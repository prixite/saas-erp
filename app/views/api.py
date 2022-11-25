from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from app import models, permissions, serializers
from app.views import mixins


@method_decorator(login_required, name="dispatch")
class HomeView(TemplateView):
    template_name = "app/api/home.html"


class EmployeeViewSet(mixins.PrivateApiMixin, ModelViewSet):
    # module = models.Module.ModuleType.EMPLOYEES

    # permission_classes = [permissions.OwnerPermission]

    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.all()

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Employee.objects.all()
        return models.Employee.objects.filter(
            organization=self.request.user.organization
        )

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.EmployeeListSerializer
        if self.action == "partial_update":
            return serializers.EmployeeUpdateSerializer
        return super().get_serializer_class()


class CompensationViewSet(ModelViewSet):
    permission_classes = [permissions.OwnerPermission]
    serializer_class = serializers.CompensationSerializer
    queryset = models.Compensation.objects.all()

    def get_object(self):
        return get_object_or_404(models.Compensation, employee_id=self.kwargs["pk"])

    def perform_create(self, serializer):
        serializer.save(employee_id=self.kwargs["pk"])


class DocumentViewSet(ModelViewSet):
    permission_classes = [permissions.OwnerPermission]
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
