from rest_framework import permissions
from rest_framework.permissions import BasePermission

class IsNotSuperUserPermission(permissions.BasePermission):

     def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        return super().has_permission(request, view)