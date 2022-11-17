from rest_framework.permissions import BasePermission
from app import models


class OwnerPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.default_role.permission == models.Role.Permission.OWNER:
            return True
        return False
