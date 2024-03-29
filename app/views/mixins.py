import datetime

from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.exceptions import PermissionDenied, ValidationError
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
            data={"detail": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN,
        )


class PrivateMixinAPI:
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
            self.module in [x.slug for x in request.user.admin_modules]
            or self.module in [x.slug for x in request.user.owner_modules]
            or self.module in [x.slug for x in request.user.member_modules]
        ):
            return super().dispatch(request, *args, **kwargs)

        return JsonResponse(
            data={"detail": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN,
        )


class OrganizationMixin(CreateModelMixin, ListModelMixin):
    def get_queryset(self):
        return self.queryset.filter(organization=self.request.user.organization)

    def perform_create(self, serializer):
        serializer.save(organization=self.request.user.organization)


class FilterMixin(ListModelMixin):
    def get_queryset(self):
        emp_id_str = self.request.query_params.get("id")
        id = int(emp_id_str) if emp_id_str else None
        interval = self.request.query_params.get("interval")
        start_date_str = self.request.query_params.get("start_date")
        end_date_str = self.request.query_params.get("end_date")

        if not id and not start_date_str and not end_date_str and not interval:
            return self.queryset.all()

        if interval == "weekly":
            some_day_last_week = timezone.now().date() - datetime.timedelta(days=7)
            start_date_str = some_day_last_week - datetime.timedelta(
                days=(some_day_last_week.isocalendar()[2] - 1)
            )
            end_date_str = start_date_str + datetime.timedelta(days=4)

        if interval == "monthly":
            end_date_str = timezone.now().date()
            start_date_str = end_date_str.replace(day=1)

        if interval == "yearly":
            end_date_str = timezone.now().date()
            start_date_str = end_date_str.replace(month=1, day=1)

        start_date = ""
        end_date = ""
        if not interval:
            start_date = (
                timezone.datetime.strptime(start_date_str, "%Y-%m-%d").date()
                if start_date_str
                else None
            )
            end_date = (
                timezone.datetime.strptime(end_date_str, "%Y-%m-%d").date()
                if end_date_str
                else None
            )

        if start_date and end_date and start_date > end_date:
            raise ValidationError("Start date must be before end date.")

        if self.module in [x.slug for x in self.request.user.member_modules]:
            emp = get_object_or_404(models.Employee, user=self.request.user)
            if id is not None and id != emp.id:
                raise PermissionDenied(
                    detail="You cannot view attendance of another employee."
                )
            id = emp.id

        else:
            if not id:
                raise ValidationError("id is required")

        if not start_date and not end_date:
            end_date = timezone.now().date()
            start_date = end_date - datetime.timedelta(days=30)
        elif not start_date:
            start_date = end_date - datetime.timedelta(days=30)
        elif not end_date:
            end_date = start_date + datetime.timedelta(days=30)

        queryset = self.queryset.filter(
            Q(employee__id=id) & Q(created_at__date__range=(start_date, end_date))
        )
        return queryset
