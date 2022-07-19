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
