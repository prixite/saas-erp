from django.db import models

from .core import Organization
from .employee import Employee


class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    time_in = models.DateTimeField(auto_now_add=True)
    time_out = models.DateTimeField(null=True, blank=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Leave(models.Model):
    class LeaveStatus(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        DENIED = "denied", "Denied"

    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="leaves"
    )
    updated_by = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="managed_leaves",
        null=True,
        blank=True,
    )
    leave_from = models.DateField()
    leave_to = models.DateField()
    status = models.SlugField(choices=LeaveStatus.choices, default="pending")
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
