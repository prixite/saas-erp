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
    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="leaves_employee"
    )
    hr = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="leaves_hr",
        null=True,
        blank=True,
    )
    leave_from = models.DateField(blank=True, null=True)
    leave_to = models.DateField(blank=True, null=True)
    leave = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
