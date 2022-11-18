from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

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

    def create(self, request, *args, **kwargs):
        employee = models.Employee.objects.filter(id=kwargs.get("pk")).exists()
        if not employee:
            return Response(
                data={"detail": "Employee does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
        return super().create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        employee = models.Employee.objects.filter(id=kwargs.get("pk")).exists()
        if not employee:
            return Response(
                data={"detail": "Employee does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
        data = super().list(request, *args, **kwargs)
        res = []
        doc_types = set()
        for doc in data.data:
            doc_types.add(doc.get("type"))
        for type in doc_types:
            res.append(
                {
                    "type": type,
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
