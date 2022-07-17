from django.db import models


class Asset(models.Model):
    name = models.CharField(max_length=128)
    type = models.ForeignKey("AssetType", on_delete=models.PROTECT)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    attribute_values = models.JSONField()
    employee = models.ForeignKey("Employee", null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class AssetType(models.Model):
    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    attributes = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
