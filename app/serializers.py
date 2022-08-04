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


class EmployeeDetailSerializer(serializers.ModelSerializer):
    degrees = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = models.Employee

        fields = [
            "id",
            "name",
            "contact_number",
            "date_of_joining",
            "nic",
            "email",
            "designation",
            "degrees",
            "emergency_contact_number",
            "organization",
            "type",
            "department",
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
            "email",
            "designation",
            # "degrees",
            "emergency_contact_number",
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
