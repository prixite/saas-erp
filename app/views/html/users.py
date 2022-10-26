from django.db import transaction
from django.urls import reverse, reverse_lazy
from django.views.generic import ListView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from app import forms, models
from app.views.mixins import AddGetFormMixin, PrivateViewMixin, UserMixin


class Users(PrivateViewMixin, UserMixin, ListView):
    template_name = "app/html/users.html"
    model = models.User
    module = "user"


class CreateUser(PrivateViewMixin, AddGetFormMixin, UserMixin, CreateView):
    model = models.User
    form_class = forms.UserForm
    template_name = "app/html/user_form.html"
    success_url = reverse_lazy("html:users")
    module = "user"

    def form_valid(self, form):
        form.instance.organization = self.request.user.organization
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        return super().get_context_data(heading="Add new user", **kwargs)


class UpdateUser(PrivateViewMixin, AddGetFormMixin, UserMixin, UpdateView):
    model = models.User
    fields = ["email", "first_name", "last_name", "default_role", "image"]
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

    def dispatch(self, request, *args, **kwargs):
        if self.get_object().id == request.user.id:
            return self.handle_no_permission()

        return super().dispatch(request, *args, **kwargs)


class UserModules(PrivateViewMixin, ListView):
    template_name = "app/html/user_modules.html"
    model = models.UserModuleRole
    module = "user"

    def get_queryset(self):
        return self.model.objects.filter(user_id=self.kwargs["pk"])

    def get_context_data(self, **kwargs):
        return super().get_context_data(
            user=models.User.objects.get(id=self.kwargs["pk"]),
            **kwargs,
        )


class CreateUserModule(PrivateViewMixin, CreateView):
    model = models.UserModuleRole
    fields = ["module", "role"]
    template_name = "app/html/user_module_form.html"
    module = "user"

    def get_form(self, *args, **kwargs):
        form = super().get_form(*args, **kwargs)
        form.fields["module"].queryset = models.Module.objects.filter(
            id__in={x.id for x in self.request.user.organization_modules}
        )
        form.fields["role"].initial = models.User.objects.get(
            id=self.kwargs["pk"]
        ).default_role
        form.fields["role"].queryset = models.Role.objects.filter(
            organization=self.request.user.organization
        )
        return form

    def form_valid(self, form):
        form.instance.user_id = self.kwargs["pk"]
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        user = models.User.objects.get(id=self.kwargs["pk"])
        return super().get_context_data(
            user=user,
            heading=f"Give access to {user.get_full_name()}",
            **kwargs,
        )

    def get_success_url(self):
        return reverse("html:user-modules", args=(self.kwargs["pk"],))


class UpdateUserModule(PrivateViewMixin, UpdateView):
    model = models.UserModuleRole
    fields = ["module", "role"]
    template_name = "app/html/user_module_form.html"
    module = "user"

    def get_form(self, *args, **kwargs):
        form = super().get_form(*args, **kwargs)
        form.fields["module"].queryset = models.Module.objects.filter(
            id__in={x.id for x in self.request.user.organization_modules}
        )
        form.fields["role"].queryset = models.Role.objects.filter(
            organization=self.request.user.organization
        )
        return form

    def get_context_data(self, **kwargs):
        return super().get_context_data(
            user=self.object.user,
            heading=f"Update access for {self.object.user.get_full_name()}",
            **kwargs,
        )

    def get_success_url(self):
        return reverse("html:user-modules", args=(self.object.user_id,))


class DeleteUserModule(PrivateViewMixin, DeleteView):
    model = models.UserModuleRole
    template_name = "app/html/user_module_confirm_delete.html"
    module = "user"

    def get_success_url(self):
        return reverse("html:user-modules", args=(self.object.user_id,))


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
