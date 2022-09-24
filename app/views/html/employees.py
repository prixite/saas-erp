from django.db import transaction
from django.urls import reverse_lazy
from django.views.generic import ListView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from app import forms, models
from app.views.mixins import CurrentOrganizationMixin, PrivateViewMixin


class Employees(PrivateViewMixin, CurrentOrganizationMixin, ListView):
    template_name = "app/html/employees.html"
    model = models.Employee
    module = models.Module.ModuleType.EMPLOYEES


class CreateEmployee(PrivateViewMixin, CurrentOrganizationMixin, CreateView):
    model = models.Employee
    fields = ["contact_number", "nic", "date_of_joining"]
    template_name = "app/html/employee_form.html"
    success_url = reverse_lazy("html:employees")
    module = models.Module.ModuleType.EMPLOYEES

    def get_context_data(self, **kwargs):
        context = super().get_context_data(heading="Add new employee", **kwargs)
        if "user_form" not in context:
            context["user_form"] = forms.EmployeeUserForm(
                request=self.request, **self.get_form_kwargs()
            )

        return context

    def form_valid(self, form):
        form.instance.organization = self.request.user.organization
        return super().form_valid(form)


class UpdateEmployee(PrivateViewMixin, CurrentOrganizationMixin, UpdateView):
    model = models.Employee
    fields = ["contact_number", "nic", "date_of_joining"]
    template_name = "app/html/employee_form.html"
    success_url = reverse_lazy("html:employees")
    module = models.Module.ModuleType.EMPLOYEES

    def get_context_data(self, **kwargs):
        context = super().get_context_data(
            heading=f"Update {self.object.user.get_full_name()}",
            **kwargs,
        )
        if "user_form" not in context:
            kwargs = self.get_form_kwargs()
            kwargs["request"] = self.request
            kwargs["instance"] = self.object.user
            context["user_form"] = forms.EmployeeUserForm(**kwargs)

        return context


class DeleteEmployee(PrivateViewMixin, CurrentOrganizationMixin, DeleteView):
    model = models.Employee
    success_url = reverse_lazy("html:employees")
    template_name = "app/html/employee_confirm_delete.html"
    module = models.Module.ModuleType.EMPLOYEES

    @transaction.atomic
    def form_valid(self, form):
        self.object.user.delete()
        return super().form_valid(form)
