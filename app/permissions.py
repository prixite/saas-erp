from rest_framework.permissions import BasePermission, SAFE_METHODS
from app import models


class OwnerPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            if request.method in SAFE_METHODS:
                return True
            return False
        if request.user.default_role.permission == models.Role.Permission.OWNER:
            return True
        return False
