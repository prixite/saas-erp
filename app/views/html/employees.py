import csv
from io import StringIO

from django.contrib import messages
from django.db import transaction
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, View
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from app import forms, models
from app.views.mixins import EmployeeOrganizationMixin, PrivateViewMixin


class Employees(PrivateViewMixin, EmployeeOrganizationMixin, ListView):
    template_name = "app/html/employees.html"
    model = models.Employee
    module = models.Module.ModuleType.EMPLOYEES


class CreateEmployee(PrivateViewMixin, EmployeeOrganizationMixin, CreateView):
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


class UploadEmployees(PrivateViewMixin, View):
    module = models.Module.ModuleType.EMPLOYEES

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        file = request.FILES.get("employees_file")
        if not file:
            messages.error(self.request, "Please select a file first")
            return redirect("html:employees-upload")
        data = StringIO(file.read().decode("utf-8"))
        next(data)
        organization = self.request.user.organization

        try:
            for row in csv.reader(data):

                default_role = models.Role.objects.get(
                    permission=models.Role.Permission[row[3]],
                    organization=organization,
                )

                user, _ = models.User.objects.get_or_create(
                    username=row[0],
                    email=row[0],
                    first_name=row[1],
                    last_name=row[2],
                    organization=organization,
                    default_role=default_role,
                )

                models.Employee.objects.get_or_create(
                    user=user,
                    nic=row[4],
                    contact_number=row[5],
                    designation=row[6],
                    date_of_joining=row[7],
                    organization=organization,
                )
        except Exception as e:
            messages.error(self.request, str(e))
            return redirect(request.META.get("HTTP_REFERER"))

        messages.success(self.request, "Employees added successfully")
        return redirect("html:employees")


class UpdateEmployee(PrivateViewMixin, EmployeeOrganizationMixin, UpdateView):
    model = models.Employee
    form_class = forms.EmployeeForm
    template_name = "app/html/employee_form.html"
    success_url = reverse_lazy("html:employees")
    module = models.Module.ModuleType.EMPLOYEES

    def get_context_data(self, **kwargs):
        return super().get_context_data(
            heading=f"Update {self.object.user.get_full_name()}",
            **kwargs,
        )

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs["request"] = self.request
        return kwargs

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().post(request, *args, **kwargs)


class DeleteEmployee(PrivateViewMixin, EmployeeOrganizationMixin, DeleteView):
    model = models.Employee
    success_url = reverse_lazy("html:employees")
    template_name = "app/html/employee_confirm_delete.html"
    module = models.Module.ModuleType.EMPLOYEES

    @transaction.atomic
    def form_valid(self, form):
        self.object.user.delete()
        return super().form_valid(form)
