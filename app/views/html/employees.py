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

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs["request"] = self.request
        return kwargs

    def form_valid(self, form):
        form.instance.organization = self.request.user.organization
        return super().form_valid(form)


class UpdateEmployee(PrivateViewMixin, CurrentOrganizationMixin, UpdateView):
    model = models.Employee
    form_class = forms.EmployeeForm
    template_name = "app/html/employee_form.html"
    success_url = reverse_lazy("html:employees")
    module = models.Module.ModuleType.EMPLOYEES

    def get_context_data(self, **kwargs):
        return super().get_context_data(
            heading=f"Update {self.object.get_full_name()}",
            **kwargs,
        )


class DeleteEmployee(PrivateViewMixin, CurrentOrganizationMixin, DeleteView):
    model = models.Employee
    success_url = reverse_lazy("html:employees")
    template_name = "app/html/employee_confirm_delete.html"
    module = models.Module.ModuleType.EMPLOYEES

    @transaction.atomic
    def form_valid(self, form):
        self.object.user.delete()
        return super().form_valid(form)
