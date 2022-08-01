from django.db import transaction
from django.urls import reverse_lazy
from django.utils.text import slugify
from django.views.generic import ListView, TemplateView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from app import forms, models
from app.views.mixins import OwnerMixin, PrivateViewMixin


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
