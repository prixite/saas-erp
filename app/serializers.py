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

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["program"] = instance.program.name
        data["institute"] = instance.institute.name
        data["employee"] = instance.employee.user.get_full_name()
        return data


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = "__all__"


class ExperirenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Experience
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["employee"] = instance.employee.user.get_full_name()
        data["company"] = instance.company.name
        return data


class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Benefit
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["organization"] = instance.organization.name
        return data


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
        validated_data["organization"] = organization
        return super().create(validated_data)

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user")
        organization = self.context.get("request").user.organization
        user_serializer = EmployeeUserSerializer(data=user_data)
        if user_serializer.is_valid():
            user = models.User.objects.get(id=self.kwargs["pk"])
            user.username = user.email
            user.organization = organization
            user.save()
        validated_data["user_id"] = user.id
        validated_data["organization"] = organization
        return super().update(instance, validated_data)

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
        fields = "__all__"


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Program
        fields = "__all__"
