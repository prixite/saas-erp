from django.urls import path

from core.views import html as views

urlpatterns = [
    path("", views.Home.as_view()),
]
