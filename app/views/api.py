from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework.viewsets import ModelViewSet

from app import models, serializers

# Create your views here.


@method_decorator(login_required, name="dispatch")
class HomeView(TemplateView):
    template_name = "app/api/home.html"


class EmployeeViewSet(ModelViewSet):
    serializer_class = serializers.EmployeeSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Employee.objects.all().order_by("organization")
        return models.Employee.objects.filter(
            organization=self.request.user.organization
        )


class CompensationViewSet(ModelViewSet):
    serializer_class = serializers.CompensationSerializer

    def get_queryset(self):
        return models.Compensation.objects.filter(employee=self.kwargs["pk"])
