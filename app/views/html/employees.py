from django.db import transaction
from django.urls import reverse, reverse_lazy
from django.views.generic import ListView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from app import forms, models
from app.views.mixins import AddGetFormMixin, CurrentOrganizationMixin, PrivateViewMixin


class Employees(PrivateViewMixin, CurrentOrganizationMixin, ListView):
    template_name = "app/html/employees.html"
    model = models.Employee
    module = models.Module.ModuleType.EMPLOYEES


class CreateEmployee(PrivateViewMixin, CurrentOrganizationMixin, CreateView):
    model = models.Employee
    form_class = forms.EmployeeForm
    template_name = "app/html/employee_form.html"
    success_url = reverse_lazy("html:employees")
    module = models.Module.ModuleType.EMPLOYEES

    def get_context_data(self, **kwargs):
        return super().get_context_data(heading="Add new employee", **kwargs)


"""
class UpdateEmployee(PrivateViewMixin, AddGetFormMixin, UserMixin, UpdateView):
    model = models.Employee
    fields = ["email", "first_name", "last_name", "default_role"]
    template_name = "app/html/employee_form.html"
    success_url = reverse_lazy("html:employees")
    module = models.Module.ModuleType.EMPLOYEES

    def get_context_data(self, **kwargs):
        return super().get_context_data(
            heading=f"Update {self.object.get_full_name()}",
            **kwargs,
        )


class DeleteEmployee(PrivateViewMixin, UserMixin, DeleteView):
    model = models.Employee
    success_url = reverse_lazy("html:users")
    template_name = "app/html/user_confirm_delete.html"
    module = models.Module.ModuleType.EMPLOYEES
    """
