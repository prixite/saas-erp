from rest_framework.viewsets import ModelViewSet

from core import models, serializers


class UserViewSet(ModelViewSet):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        return models.User.objects.all()
