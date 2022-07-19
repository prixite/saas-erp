from django.db import models


class Asset(models.Model):
    """
    The asset in an organization.

    attributes_values: This is a hash table which maps asset attributes to a
    value.
    """

    name = models.CharField(max_length=128)
    type = models.ForeignKey("AssetType", on_delete=models.PROTECT)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    attribute_values = models.JSONField()
    employee = models.ForeignKey("Employee", null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class AssetType(models.Model):
    """
    Currently we support following assets:
    - Laptop
    - Mouse
    - LCD Screen

    attributes: This is a list of attributes of an asset. For example, model.
    """

    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    attributes = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
