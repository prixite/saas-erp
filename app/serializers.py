from rest_framework import serializers

from app import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["first_name", "last_name"]


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
            "department"
        ]
