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
    fields = ["email", "first_name", "last_name", "role"]
    template_name = "app/html/user_form.html"
    success_url = reverse_lazy("html:users")

    def form_valid(self, form):
        form.instance.username = form.instance.email
        return super().form_valid(form)


class UpdateUser(UpdateView):
    model = models.User
    fields = ["email", "first_name", "last_name", "role"]
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


class Roles(ListView):
    template_name = "app/html/roles.html"
    model = models.Role


class CreateRole(CreateView):
    model = models.Role
    fields = ["name", "is_admin"]
    template_name = "app/html/role_form.html"
    success_url = reverse_lazy("html:roles")

    def form_valid(self, form):
        form.instance.organization = self.request.user.organization
        return super().form_valid(form)


class UpdateRole(UpdateView):
    model = models.User
    fields = ["name", "is_admin"]
    template_name = "app/html/role_form.html"
    success_url = reverse_lazy("html:roles")


class ManageOrganizations(TemplateView):
    template_name = "app/html/manage_organizations.html"


class Organizations(ListView):
    template_name = "app/html/organizations.html"
    model = models.Organization


class CreateOrganization(CreateView):
    model = models.Organization
    fields = ["name", "address"]
    template_name = "app/html/organization_form.html"
    success_url = reverse_lazy("html:organizations")

    def form_valid(self, form):
        response = super().form_valid(form)
        models.Role.objects.create(
            name="Owner",
            is_owner=True,
            organization=form.instance,
        )
        return response


class UpdateOrganization(UpdateView):
    model = models.Organization
    fields = ["name", "address"]
    template_name = "app/html/organization_form.html"
    success_url = reverse_lazy("html:organizations")


class DeleteOrganization(DeleteView):
    model = models.Organization
    success_url = reverse_lazy("html:organizations")
    template_name = "app/html/organization_confirm_delete.html"


class Owners(ListView):
    template_name = "app/html/owners.html"
    model = models.User

    def get_queryset(self):
        return self.model.objects.filter(role__is_owner=True)


class CreateOwner(CreateView):
    model = models.User
    fields = ["email", "first_name", "last_name", "organization"]
    template_name = "app/html/owner_form.html"
    success_url = reverse_lazy("html:owners")

    def get_queryset(self):
        return self.model.objects.filter(role__is_owner=True)

    def form_valid(self, form):
        form.instance.role = models.Role.objects.filter(
            organization=form.instance.organization,
            is_owner=True,
        ).first()
        return super().form_valid(form)


class UpdateOwner(UpdateView):
    model = models.User
    fields = ["email", "first_name", "last_name", "organization"]
    template_name = "app/html/owner_form.html"
    success_url = reverse_lazy("html:owners")

    def get_queryset(self):
        return self.model.objects.filter(role__is_owner=True)
