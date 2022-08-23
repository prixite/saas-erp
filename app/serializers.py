from rest_framework import serializers

from app import models


class EmployeeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = [
            "id",
            "contact_number",
            "date_of_joining",
        ]


class EmployeeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["first_name", "email"]


class EmployeeSerializer(serializers.ModelSerializer):
    user = EmployeeUserSerializer(write_only=True)

    class Meta:
        model = models.Employee

        fields = [
            "id",
            "user",
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

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = models.User.objects.create(
            username=user_data["email"],
            first_name=user_data["first_name"],
        )
        return models.Employee.objects.create(user=user, **validated_data)


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
