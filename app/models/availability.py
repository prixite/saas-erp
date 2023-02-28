from django.db import models

from project.settings import AUTH_USER_MODEL


class Availability(models.Model):

    employee = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
