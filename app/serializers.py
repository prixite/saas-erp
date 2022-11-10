from rest_framework import serializers

from app import models


class EmployeeListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)

    class Meta:
        model = models.Employee
        fields = [
            "id",
            "first_name",
            "last_name",
            "contact_number",
            "date_of_joining",
        ]


class EmployeeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["first_name", "last_name", "email"]


class EmployeeSerializer(serializers.ModelSerializer):
    user = EmployeeUserSerializer()

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


class MeSerializer(serializers.ModelSerializer):
    organization = serializers.CharField(
        source="organization.name",
        default="",
    )

    class Meta:
        model = models.User
        fields = [
            "first_name",
            "last_name",
            "email",
            "organization",
            "image",
            "is_superuser",
            "headline",
        ]
