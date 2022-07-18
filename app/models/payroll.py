from django.db import models


class CompensationHistory(models.Model):
    """
    All the compensations given to an employee.
    """
    employee = models.ForeignKey("Employee", on_delete=models.CASCADE)
    amount = models.FloatField()
    tax = models.FloatField()
    bonus = models.FloatField(default=0)
    action = models.CharField(max_length=5)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Compensation(models.Model):
    """
    Current compensation according to the contract.
    """
    employee = models.OneToOneField("Employee", on_delete=models.CASCADE)
    rate = models.FloatField()
    max_hours_per_week = models.SmallIntegerField(null=True)
    expected_hours_per_week = models.SmallIntegerField(null=True)
    compensation_type = models.ForeignKey("CompensationType", on_delete=models.PROTECT)
    compensation_schedule = models.ForeignKey(
        "CompensationSchedule", on_delete=models.PROTECT
    )
    currency = models.ForeignKey("Currency", on_delete=models.PROTECT)
    updated_at = models.DateTimeField(auto_now=True)


class CompensationChange(models.Model):
    """
    Change in compensation. A change can be due to increment for example.
    """
    employee = models.OneToOneField("Employee", on_delete=models.CASCADE)
    amount = models.FloatField()
    reason = models.ForeignKey("CompensationChangeReason", on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CompensationChangeReason(models.Model):
    """
    Currently we support the following:
    - Increment
    - Change in status
    """
    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CompensationSchedule(models.Model):
    """
    Represents when compensation is to be disbursed.
    """
    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    is_weekly = models.BooleanField(default=False)
    is_monthly = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CompensationType(models.Model):
    """
    Hourly, monthly, milestone based etc.
    """
    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    is_hourly = models.BooleanField(default=False)
    is_monthly = models.BooleanField(default=False)
    is_milestone = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
