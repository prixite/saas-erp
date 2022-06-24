from rest_framework.viewsets import ModelViewSet
from django.views.generic import TemplateView
from core import models, serializers

# Create your views here.


class HomeView(TemplateView):
    template_name = 'core/index.html'

class UserViewSet(ModelViewSet):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        return models.User.objects.all()
