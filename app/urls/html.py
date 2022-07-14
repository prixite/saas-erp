from django.urls import path

from app.views import html as views

urlpatterns = [
    path("", views.Home.as_view()),
]
