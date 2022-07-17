from django.db import models


class CompensationHistory(models.Model):
    employee = models.ForeignKey("Employee", on_delete=models.CASCADE)
    amount = models.FloatField()
    tax = models.FloatField()
    bonus = models.FloatField(default=0)
    action = models.CharField(max_length=5)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Compensation(models.Model):
    employee = models.OneToOneField("Employee", on_delete=models.CASCADE)
    rate = models.FloatField()
    hourly_limit_per_week = models.SmallIntegerField(null=True)
    hourly_limit_per_month = models.SmallIntegerField(null=True)
    compensation_type = models.ForeignKey("CompensationType", on_delete=models.PROTECT)
    compensation_schedule = models.ForeignKey(
        "CompensationSchedule", on_delete=models.PROTECT
    )
    currency = models.ForeignKey("Currency", on_delete=models.PROTECT)
    updated_at = models.DateTimeField(auto_now=True)


class CompensationChange(models.Model):
    employee = models.OneToOneField("Employee", on_delete=models.CASCADE)
    amount = models.FloatField()
    reason = models.ForeignKey("CompensationChangeReason", on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CompensationChangeReason(models.Model):
    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CompensationSchedule(models.Model):
    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    is_weekly = models.BooleanField(default=False)
    is_monthly = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CompensationType(models.Model):
    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    is_hourly = models.BooleanField(default=False)
    is_monthly = models.BooleanField(default=False)
    is_milestone = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
