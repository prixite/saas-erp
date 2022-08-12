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


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee

        fields = [
            "id",
            "name",
            "contact_number",
            "date_of_joining",
            "nic",
            "designation",
            "degrees",
            "emergency_contact_number",
            "organization",
            "type",
            "department",
        ]

        read_only_fields = ["degrees"]


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


class DocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Document
        fields = [
            "name",
            "type",
            "document_url",
        ]
