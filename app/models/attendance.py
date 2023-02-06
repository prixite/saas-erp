from django.db import models

from project.settings import AUTH_USER_MODEL

from .core import Organization
from .employee import Employee
from .soft_delete import ActiveEmployeeModel


class Attendance(ActiveEmployeeModel):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    time_in = models.DateTimeField(auto_now_add=True)
    time_out = models.DateTimeField(null=True, blank=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Leave(ActiveEmployeeModel):
    class LeaveStatus(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        DENIED = "denied", "Denied"

    class LeaveType(models.TextChoices):
        SICK_LEAVE = "sick leave", "Sick Leave"
        ANNUAL_LEAVE = "annual leave", "Annual Leave"
        CASUAL_LEAVE = "casual leave", "Casual Leave"

    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="leaves"
    )
    updated_by = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="managed_leaves",
        null=True,
        blank=True,
    )
    leave_type = models.CharField(
        max_length=20, choices=LeaveType.choices, blank=True, null=True
    )
    leave_from = models.DateField()
    leave_to = models.DateField()
    description = models.TextField()
    hr_comment = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20, choices=LeaveStatus.choices, default="pending"
    )
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
