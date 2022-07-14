from django.views.generic import TemplateView, ListView
from app import models


class Home(TemplateView):
    template_name = "app/html/home.html"


class Users(ListView):
    template_name = "app/html/users.html"
    model = models.User


class Employees(TemplateView):
    template_name = "app/html/employees.html"


class Settings(TemplateView):
    template_name = "app/html/settings.html"


class Account(TemplateView):
    template_name = "app/html/account.html"
