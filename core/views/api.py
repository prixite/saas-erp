from rest_framework.viewsets import ModelViewSet

from core import models, serializers


class EmployeeViewSet(ModelViewSet):
    serializer_class = serializers.EmployeeSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Employee.objects.all().order_by("organization")
        return models.Employee.objects.filter(
            organization=self.request.user.organization
        )


class UserViewSet(ModelViewSet):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        return models.User.objects.all()
