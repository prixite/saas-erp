from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import ListView, TemplateView
from django.views.generic.edit import CreateView, UpdateView

from app import models
from app.views.html.organizations import (
    CreateModule,
    CreateOrganization,
    CreateOrganizationModule,
    CreateOwner,
    DeleteModule,
    DeleteOrganization,
    DeleteOrganizationModule,
    ManageOrganizations,
    Modules,
    OrganizationModules,
    Organizations,
    Owners,
    UpdateModule,
    UpdateOrganization,
    UpdateOrganizationModule,
    UpdateOwner,
)
from app.views.html.users import (
    CreateUser,
    CreateUserModule,
    DeleteUser,
    DeleteUserModule,
    InviteUser,
    UpdateUser,
    UpdateUserModule,
    UserModules,
    Users,
)
from app.views.mixins import PrivateViewMixin

__all__ = [
    "Account",
    "CreateModule",
    "CreateOrganization",
    "CreateOrganizationModule",
    "CreateOwner",
    "CreateRole",
    "CreateUser",
    "CreateUserModule",
    "DeleteModule",
    "DeleteOrganization",
    "DeleteOrganizationModule",
    "DeleteUser",
    "DeleteUserModule",
    "Employees",
    "Home",
    "Inventory",
    "InviteUser",
    "ManageOrganizations",
    "Modules",
    "OrganizationModules",
    "Organizations",
    "Owners",
    "Payroll",
    "Roles",
    "Settings",
    "UpdateModule",
    "UpdateOrganization",
    "UpdateOrganizationModule",
    "UpdateOwner",
    "UpdateRole",
    "UpdateUser",
    "UpdateUserModule",
    "Users",
    "UserModules",
]


class Home(LoginRequiredMixin, TemplateView):
    template_name = "app/html/home.html"


class Employees(PrivateViewMixin, TemplateView):
    template_name = "app/html/employees.html"
    module = "employees"


class Payroll(PrivateViewMixin, TemplateView):
    template_name = "app/html/payroll.html"


class Inventory(PrivateViewMixin, TemplateView):
    template_name = "app/html/inventory.html"


class Settings(PrivateViewMixin, TemplateView):
    template_name = "app/html/settings.html"
    module = "settings"


class Account(PrivateViewMixin, TemplateView):
    template_name = "app/html/account.html"


class Roles(PrivateViewMixin, ListView):
    template_name = "app/html/roles.html"
    model = models.Role


class CreateRole(PrivateViewMixin, CreateView):
    model = models.Role
    fields = ["name", "is_admin"]
    template_name = "app/html/role_form.html"
    success_url = reverse_lazy("html:roles")

    def form_valid(self, form):
        form.instance.organization = self.request.user.organization
        return super().form_valid(form)


class UpdateRole(PrivateViewMixin, UpdateView):
    model = models.User
    fields = ["name", "is_admin"]
    template_name = "app/html/role_form.html"
    success_url = reverse_lazy("html:roles")


class Logout(LoginRequiredMixin, TemplateView):
    template_name = "app/html/logout.html"
