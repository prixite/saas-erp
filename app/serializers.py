from rest_framework import serializers

from app import models


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = [
            "name",
            "contact_number",
            "nic",
            "emergency_contact_number",
            "date_of_joining",
            "organization",
            "type",
            "department",
        ]


class CompensationSerializer(serializers.ModelSerializer):
    current_salary = serializers.FloatField(read_only=True)

    class Meta:
        model = models.Compensation
        fields = [
            "current_salary",
            "currency",
            "compensation_type",
            "compensation_schedule",
        ]
