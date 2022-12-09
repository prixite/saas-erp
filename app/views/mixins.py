from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.permissions import SAFE_METHODS
from rest_framework.views import status

from app import models


class PrivateViewMixin(LoginRequiredMixin):
    allow_superuser = False
    module = None

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()

        if request.user.is_superuser and self.allow_superuser:
            return super().dispatch(request, *args, **kwargs)

        if self.module in [x.slug for x in request.user.member_modules]:
            return super().dispatch(request, *args, **kwargs)

        if self.module in [x.slug for x in request.user.admin_modules]:
            request.user.is_module_admin = True
            return super().dispatch(request, *args, **kwargs)

        if self.module in [x.slug for x in request.user.owner_modules]:
            request.user.is_module_owner = True
            return super().dispatch(request, *args, **kwargs)

        return self.handle_no_permission()


class EmployeeOrganizationMixin:
    def get_queryset(self):
        return self.model.objects.filter(
            user__organization=self.request.user.organization,
        )


class UserMixin:
    def get_queryset(self):
        return self.model.objects.filter(
            organization=self.request.user.organization,
            is_superuser=False,
        )


class OwnerMixin:
    def get_queryset(self):
        return self.model.objects.filter(
            default_role__permission=models.Role.Permission.OWNER,
            is_superuser=False,
        )


class AddGetFormMixin:
    def get_form(self, *args, **kwargs):
        form = super().get_form(*args, **kwargs)
        form.fields["default_role"].queryset = models.Role.objects.filter(
            organization=self.request.user.organization,
        )
        return form


class PrivateApiMixin:
    allow_superuser = False
    module = None

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse(
                data={"detail": "You must be logged in first to perform this action"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if request.user.is_superuser and self.allow_superuser:
            return super().dispatch(request, *args, **kwargs)

        if (
            self.module in [x.slug for x in request.user.member_modules]
            and request.method in SAFE_METHODS
        ):
            return super().dispatch(request, *args, **kwargs)

        if self.module in [
            x.slug for x in request.user.admin_modules
        ] or self.module in [x.slug for x in request.user.owner_modules]:
            return super().dispatch(request, *args, **kwargs)

        return JsonResponse(
            data={"detail": "Not allowed"},
            status=status.HTTP_403_FORBIDDEN,
        )


class OrganizationMixin(CreateModelMixin, ListModelMixin):
    def get_queryset(self):
        return self.queryset.filter(organization=self.request.user.organization)

    def perform_create(self, serializer):
        serializer.save(organization=self.request.user.organization)
