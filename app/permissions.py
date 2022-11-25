from rest_framework.permissions import SAFE_METHODS, BasePermission

from app import models


class OwnerPermission(BasePermission):
    module = None

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return self.handle_no_permission()

        if request.user.is_superuser and self.allow_superuser:
            return False

        if self.module in [x.slug for x in request.user.member_modules]:
            if self.module in [x.slug for x in request.user.admin_modules]:
                request.user.is_module_admin = True
            if self.module in [x.slug for x in request.user.owner_modules]:
                request.user.is_module_owner = True

            return False

        return False
