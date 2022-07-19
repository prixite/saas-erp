from django.urls import reverse_lazy
from django.views.generic import ListView, TemplateView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from app import models


class Home(TemplateView):
    template_name = "app/html/home.html"


class Users(ListView):
    template_name = "app/html/users.html"
    model = models.User


class CreateUser(CreateView):
    model = models.User
    fields = ["email", "first_name", "last_name"]
    template_name = "app/html/user_form.html"
    success_url = reverse_lazy("html:users")

    def form_valid(self, form):
        form.instance.username = form.instance.email
        return super().form_valid(form)


class UpdateUser(UpdateView):
    model = models.User
    fields = ["email", "first_name", "last_name"]
    template_name = "app/html/user_form.html"
    success_url = reverse_lazy("html:users")


class DeleteUser(DeleteView):
    model = models.User
    success_url = reverse_lazy("html:users")
    template_name = "app/html/user_confirm_delete.html"


class Employees(TemplateView):
    template_name = "app/html/employees.html"


class Payroll(TemplateView):
    template_name = "app/html/payroll.html"


class Inventory(TemplateView):
    template_name = "app/html/inventory.html"


class Settings(TemplateView):
    template_name = "app/html/settings.html"


class Account(TemplateView):
    template_name = "app/html/account.html"
