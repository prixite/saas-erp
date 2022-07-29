from django.contrib.auth.mixins import LoginRequiredMixin
from django.db import transaction
from django.urls import reverse_lazy
from django.utils.text import slugify
from django.views.generic import ListView, TemplateView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from app import forms, models


class PrivateViewMixin(LoginRequiredMixin):
    allow_superuser = False
    module = None

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()

        if request.user.is_superuser and self.allow_superuser:
            return super().dispatch(request, *args, **kwargs)

        if self.module in [x.slug for x in request.user.member_modules]:
            if self.module in [x.slug for x in request.user.admin_modules]:
                request.user.is_module_admin = True
            if self.module in [x.slug for x in request.user.owner_modules]:
                request.user.is_module_owner = True

                return super().dispatch(request, *args, **kwargs)

        return self.handle_no_permission()


class Home(LoginRequiredMixin, TemplateView):
    template_name = "app/html/home.html"


class UserMixin:
    def get_queryset(self):
        return self.model.objects.filter(
            is_superuser=False,
            organization=self.request.user.organization,
        )


class Users(PrivateViewMixin, UserMixin, ListView):
    template_name = "app/html/users.html"
    model = models.User
    module = "user"


class CreateUser(PrivateViewMixin, UserMixin, CreateView):
    model = models.User
    form_class = forms.UserForm
    template_name = "app/html/user_form.html"
    success_url = reverse_lazy("html:users")
    module = "user"

    def get_context_data(self, **kwargs):
        return super().get_context_data(heading="Add new user", **kwargs)


class UpdateUser(PrivateViewMixin, UserMixin, UpdateView):
    model = models.User
    fields = ["email", "first_name", "last_name", "default_role"]
    template_name = "app/html/user_form.html"
    success_url = reverse_lazy("html:users")
    module = "user"

    def get_context_data(self, **kwargs):
        return super().get_context_data(
            heading=f"Update {self.object.get_full_name()}",
            **kwargs,
        )


class DeleteUser(PrivateViewMixin, UserMixin, DeleteView):
    model = models.User
    success_url = reverse_lazy("html:users")
    template_name = "app/html/user_confirm_delete.html"
    module = "user"


class UserModules(PrivateViewMixin, ListView):
    template_name = "app/html/user_modules.html"
    model = models.UserModuleRole
    module = "user"

    def get_queryset(self):
        return self.model.objects.filter(user_id=self.kwargs["pk"])


class CreateUserModule(PrivateViewMixin, CreateView):
    model = models.UserModuleRole
    fields = ["module", "role"]
    template_name = "app/html/user_module_form.html"
    success_url = reverse_lazy("html:users")
    module = "user"


class UpdateUserModule(PrivateViewMixin, UpdateView):
    model = models.UserModuleRole
    fields = ["module", "role"]
    template_name = "app/html/user_module_form.html"
    success_url = reverse_lazy("html:users")
    module = "user"


class DeleteUserModule(PrivateViewMixin, DeleteView):
    model = models.UserModuleRole
    success_url = reverse_lazy("html:users")
    template_name = "app/html/user_module_confirm_delete.html"
    module = "user"


class InviteUser(UpdateView):
    model = models.User
    fields = ["password"]
    template_name = "app/html/user_form.html"
    success_url = reverse_lazy("html:home")

    def get_slug_field(self):
        return "invitation__slug"

    @transaction.atomic
    def form_valid(self, form):
        form.instance.set_password(form.instance.password)
        form.instance.invitation.is_onboarded = True
        form.instance.invitation.save()
        return super().form_valid(form)


class Employees(PrivateViewMixin, TemplateView):
    template_name = "app/html/employees.html"


class Payroll(PrivateViewMixin, TemplateView):
    template_name = "app/html/payroll.html"


class Inventory(PrivateViewMixin, TemplateView):
    template_name = "app/html/inventory.html"


class Settings(PrivateViewMixin, TemplateView):
    template_name = "app/html/settings.html"


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


class ManageOrganizations(PrivateViewMixin, TemplateView):
    template_name = "app/html/manage_organizations.html"
    allow_superuser = True


class Organizations(PrivateViewMixin, ListView):
    template_name = "app/html/organizations.html"
    model = models.Organization
    allow_superuser = True


class CreateOrganization(PrivateViewMixin, CreateView):
    model = models.Organization
    fields = ["name", "address"]
    template_name = "app/html/organization_form.html"
    success_url = reverse_lazy("html:organizations")
    allow_superuser = True

    @transaction.atomic
    def form_valid(self, form):
        response = super().form_valid(form)
        models.Role.objects.bulk_create(
            [
                models.Role(
                    name="Owner",
                    permission=models.Role.Permission.OWNER,
                    is_default=True,
                    organization=form.instance,
                ),
                models.Role(
                    name="Admin",
                    permission=models.Role.Permission.ADMIN,
                    is_default=True,
                    organization=form.instance,
                ),
                models.Role(
                    name="Member",
                    permission=models.Role.Permission.MEMBER,
                    is_default=True,
                    organization=form.instance,
                ),
            ]
        )
        return response


class UpdateOrganization(PrivateViewMixin, UpdateView):
    model = models.Organization
    fields = ["name", "address"]
    template_name = "app/html/organization_form.html"
    success_url = reverse_lazy("html:organizations")
    allow_superuser = True


class DeleteOrganization(PrivateViewMixin, DeleteView):
    model = models.Organization
    success_url = reverse_lazy("html:organizations")
    template_name = "app/html/organization_confirm_delete.html"
    allow_superuser = True


class Modules(PrivateViewMixin, ListView):
    template_name = "app/html/modules.html"
    model = models.Module
    allow_superuser = True


class CreateModule(PrivateViewMixin, CreateView):
    model = models.Module
    fields = ["name", "is_enabled"]
    template_name = "app/html/module_form.html"
    success_url = reverse_lazy("html:modules")
    allow_superuser = True

    def form_valid(self, form):
        form.instance.slug = slugify(form.instance.name)
        return super().form_valid(form)


class UpdateModule(PrivateViewMixin, UpdateView):
    model = models.Module
    fields = ["name", "is_enabled"]
    template_name = "app/html/module_form.html"
    success_url = reverse_lazy("html:modules")
    allow_superuser = True


class DeleteModule(PrivateViewMixin, DeleteView):
    model = models.Module
    success_url = reverse_lazy("html:modules")
    template_name = "app/html/module_confirm_delete.html"
    allow_superuser = True


class OrganizationModules(PrivateViewMixin, ListView):
    template_name = "app/html/organization_modules.html"
    model = models.OrganizationModule
    allow_superuser = True


class CreateOrganizationModule(PrivateViewMixin, CreateView):
    model = models.OrganizationModule
    fields = ["organization", "module", "is_enabled"]
    template_name = "app/html/organization_module_form.html"
    success_url = reverse_lazy("html:organizations-modules")
    allow_superuser = True


class UpdateOrganizationModule(PrivateViewMixin, UpdateView):
    model = models.OrganizationModule
    fields = ["organization", "module", "is_enabled"]
    template_name = "app/html/organization_module_form.html"
    success_url = reverse_lazy("html:organizations-modules")
    allow_superuser = True


class DeleteOrganizationModule(PrivateViewMixin, DeleteView):
    model = models.OrganizationModule
    success_url = reverse_lazy("html:organizations-modules")
    template_name = "app/html/organization_module_confirm_delete.html"
    allow_superuser = True


class OwnerMixin:
    def get_queryset(self):
        return self.model.objects.filter(
            default_role__permission=models.Role.Permission.OWNER,
            is_superuser=False,
        )


class Owners(PrivateViewMixin, OwnerMixin, ListView):
    template_name = "app/html/owners.html"
    model = models.User
    allow_superuser = True


class CreateOwner(PrivateViewMixin, OwnerMixin, CreateView):
    model = models.User
    form_class = forms.OwnerForm
    template_name = "app/html/owner_form.html"
    success_url = reverse_lazy("html:owners")
    allow_superuser = True


class UpdateOwner(PrivateViewMixin, OwnerMixin, UpdateView):
    model = models.User
    fields = ["email", "first_name", "last_name", "organization"]
    template_name = "app/html/owner_form.html"
    success_url = reverse_lazy("html:owners")
    allow_superuser = True


class Logout(LoginRequiredMixin, TemplateView):
    template_name = "app/html/logout.html"
