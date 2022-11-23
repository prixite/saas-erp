from rest_framework import serializers
from django.db import transaction

from app import models


class EmployeeListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    image = serializers.ImageField(source="user.image", read_only=True)

    class Meta:
        model = models.Employee
        fields = [
            "id",
            "first_name",
            "last_name",
            "contact_number",
            "date_of_joining",
            "image",
        ]


class EmployeeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["first_name", "last_name", "email", "image"]


class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Degree
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        exclude = ("organization",)


class ExperirenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Experience
        fields = "__all__"


class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Benefit
        exclude = ("organization",)


class EmployeeUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = [
            "department",
            "designation",
            "manager",
            "benefits",
            "type",
            "user_allowed",
        ]


class EmployeeSerializer(serializers.ModelSerializer):
    user = EmployeeUserSerializer()
    degrees = DegreeSerializer(many=True, read_only=True)
    experience = ExperirenceSerializer(many=True, read_only=True)

    class Meta:
        model = models.Employee
        exclude = ("organization",)

    @transaction.atomic
    def create(self, validated_data):
        user_data = validated_data.pop("user")
        organization = self.context.get("request").user.organization
        user_serializer = EmployeeUserSerializer(data=user_data)
        if user_serializer.is_valid():
            user = models.User.objects.create(**user_serializer.validated_data)
            user.username = user.email
            user.organization = organization
            user.save()
        validated_data["user_id"] = user.id
        return super().create(validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["organization"] = instance.organization.name
        if instance.department:
            data["department"] = instance.department.name
        if instance.manager:
            data["manager"] = instance.manager.user.get_full_name()
        if instance.type:
            data["type"] = instance.type.name
        if instance.benefits:
            data["benefits"] = BenefitSerializer(
                instance.benefits.all(), many=True
            ).data
        return data


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


class InstitueSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Institute
        exclude = ("organization",)


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Program
        exclude = ("organization",)


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Department
        exclude = ("organization",)


class EmployeementTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EmploymentType
        exclude = ("organization",)
