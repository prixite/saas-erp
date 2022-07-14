from django.views.generic import TemplateView


class Home(TemplateView):
    template_name = "app/html/home.html"


class Users(TemplateView):
    template_name = "app/html/users.html"


class Employees(TemplateView):
    template_name = "app/html/employees.html"


class Settings(TemplateView):
    template_name = "app/html/settings.html"


class Account(TemplateView):
    template_name = "app/html/account.html"
