from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework.generics import RetrieveAPIView
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth import update_session_auth_hash
from rest_framework.response import Response


from app import models, serializers


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


class UserPasswordViewSet(ModelViewSet):
    def get_serializer_class(self):
        return serializers.UpsertUserPasswordSerializer

    def get_queryset(self):
        return models.User.objects.filter(id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, partial=kwargs["partial"])
        if serializer.is_valid(raise_exception=True):
            request.user.set_password(serializer.data["password"])
            request.user.save()
            update_session_auth_hash(request, request.user)
        return Response(serializer.errors)
