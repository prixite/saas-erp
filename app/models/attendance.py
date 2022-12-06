from django.db import models
from app.models import Employee, Organization


class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    time_in = models.DateTimeField(auto_now_add=True)
    time_out = models.DateTimeField(null=True, blank=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
