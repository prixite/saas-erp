from django.contrib.auth.mixins import LoginRequiredMixin
from django.db import transaction
from django.urls import reverse_lazy
from django.views.generic import ListView, TemplateView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from app import models
from app.lib.user import send_invite


class PrivateViewMixin(LoginRequiredMixin):
    allow_superuser = False
    allowed_roles = set()

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()

        if request.user.is_superuser and not self.allow_superuser:
            return self.handle_no_permission()
        elif not request.user.is_superuser:
            if self.allow_superuser:
                return self.handle_no_permission()
            else:
                modules = [x for x in request.user.modules if x in self.allowed_roles]
                if not modules:
                    return self.handle_no_permission()

                if [x for x in modules if x.role.is_admin or x.role.is_owner]:
                    request.user.is_admin = True

        return super().dispatch(request, *args, **kwargs)


class Home(PrivateViewMixin, TemplateView):
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


class CreateUser(PrivateViewMixin, UserMixin, CreateView):
    model = models.User
    fields = ["email", "first_name", "last_name", "role"]
    template_name = "app/html/user_form.html"
    success_url = reverse_lazy("html:users")

    def form_valid(self, form):
        form.instance.username = form.instance.email
        form.instance.default_role = models.Role.objects.filter(
            organization=form.instance.organization,
            is_member=True,
            is_default=True,
        ).first()
        return super().form_valid(form)


class UpdateUser(PrivateViewMixin, UserMixin, UpdateView):
    model = models.User
    fields = ["email", "first_name", "last_name", "role"]
    template_name = "app/html/user_form.html"
    success_url = reverse_lazy("html:users")


class DeleteUser(PrivateViewMixin, UserMixin, DeleteView):
    model = models.User
    success_url = reverse_lazy("html:users")
    template_name = "app/html/user_confirm_delete.html"


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
                    is_owner=True,
                    is_default=True,
                    organization=form.instance,
                ),
                models.Role(
                    name="Admin",
                    is_owner=True,
                    is_default=True,
                    organization=form.instance,
                ),
                models.Role(
                    name="Member",
                    is_owner=True,
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


class OwnerMixin:
    def get_queryset(self):
        return self.model.objects.filter(
            default_role__is_owner=True,
            is_superuser=False,
        )


class Owners(PrivateViewMixin, OwnerMixin, ListView):
    template_name = "app/html/owners.html"
    model = models.User
    allow_superuser = True


class CreateOwner(PrivateViewMixin, OwnerMixin, CreateView):
    model = models.User
    fields = ["email", "first_name", "last_name", "organization"]
    template_name = "app/html/owner_form.html"
    success_url = reverse_lazy("html:owners")
    allow_superuser = True

    @transaction.atomic
    def form_valid(self, form):
        form.instance.username = form.instance.email
        form.instance.default_role = models.Role.objects.filter(
            organization=form.instance.organization,
            is_owner=True,
            is_default=True,
        ).first()
        response = super().form_valid(form)
        invite = models.Invitation(user=form.instance)
        invite.generate_key()
        invite.save()
        send_invite(form.instance)
        return response


class UpdateOwner(PrivateViewMixin, OwnerMixin, UpdateView):
    model = models.User
    fields = ["email", "first_name", "last_name", "organization"]
    template_name = "app/html/owner_form.html"
    success_url = reverse_lazy("html:owners")
    allow_superuser = True


class Logout(LoginRequiredMixin, TemplateView):
    template_name = "app/html/logout.html"
