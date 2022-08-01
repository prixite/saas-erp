from rest_framework import serializers

from app import models


class EmployeeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = [
            "id",
            "name",
            "contact_number",
            "date_of_joining",
        ]


class EmployeeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = [
            "id",
            "name",
            "contact_number",
            "date_of_joining",
            "nic",
            "emergency_contact_number",
            "organization",
            "type",
            "department",
        ]
