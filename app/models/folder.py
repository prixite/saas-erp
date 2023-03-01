from django.conf import settings
from django.db import models


class Folder(models.Model):
    name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Document(models.Model):
    folder = models.ForeignKey(
        "Folder", on_delete=models.CASCADE, related_name="documents", null=True
    )
    title = models.CharField(max_length=255, default="", blank=True)
    text = models.TextField()
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    document_link = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
