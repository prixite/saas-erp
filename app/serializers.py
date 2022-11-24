from datetime import date

from django.conf import settings
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from app import models


class EmployeeListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = models.Employee
        fields = [
            "id",
            "org_id",
            "first_name",
            "last_name",
            "contact_number",
            "date_of_joining",
            "avatar",
        ]

    def get_avatar(self, data):
        return f"{settings.DOMAIN_NAME}{data.user.image.url}"


class EmployeeUserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = models.User
        fields = ["first_name", "last_name", "email", "avatar"]

    def get_avatar(self, data):
        return f"{settings.DOMAIN_NAME}{data.image.url}"


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = "__all__"


class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Benefit
        fields = "__all__"


class DegreeSerializer(serializers.ModelSerializer):
    program = serializers.CharField(source="program.name")
    institute = serializers.CharField(source="institute.name")

    class Meta:
        model = models.Degree
        fields = ["program", "institute", "year"]


class ExperirenceSerializer(serializers.ModelSerializer):
    company = serializers.CharField(source="company.name")

    class Meta:
        model = models.Experience
        fields = ["title", "company", "start_date", "end_date"]


class EmployeeSerializer(serializers.ModelSerializer):
    user = EmployeeUserSerializer()
    degrees = DegreeSerializer(many=True, read_only=True)
    experience = ExperirenceSerializer(many=True, read_only=True)
    benefits = serializers.SlugRelatedField(
        slug_field="name", read_only=True, many=True
    )
    org_id = serializers.CharField(read_only=True)

    total_experience = serializers.SerializerMethodField()

    class Meta:
        model = models.Employee
        exclude = ("organization",)

    def get_total_experience(self, data):
        total_days = 0
        for exp in data.experience.all():
            start_date = date(
                exp.start_date.year, exp.start_date.month, exp.start_date.day
            )
            end_date = date(exp.end_date.year, exp.end_date.month, exp.end_date.day)
            delta = end_date - start_date
            total_days = total_days + delta.days
        years = total_days // 365
        months = (total_days - years * 365) // 30

        if total_days < 30:
            return "No experience yet."

        total_experience = ""

        total_experience = (
            f"{years} years " if years > 1 else "" if not years else f"{years} year "
        )
        total_experience += f"{months} months" if months > 1 else f"{months} month"
        return total_experience

    @transaction.atomic
    def create(self, validated_data):
        user_data = validated_data.pop("user")
        current_user = self.context.get("request").user
        user_serializer = EmployeeUserSerializer(data=user_data)
        if user_serializer.is_valid():
            user = models.User.objects.create(**user_serializer.validated_data)
            user.username = user.email
            user.organization = current_user.organization
            user.save()
        validated_data["user_id"] = user.id
        validated_data["organization"] = current_user.organization
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
        exclude = ["employee"]

    def validate(self, attrs):
        get_object_or_404(models.Employee, id=self.context.get("view").kwargs["pk"])
        if models.Compensation.objects.filter(
            employee_id=self.context.get("view").kwargs.get("pk")
        ).exists():
            raise serializers.ValidationError(
                "Compensation already exists for this employee"
            )

        return attrs

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["compensation_type"] = instance.compensation_type.name
        data["compensation_schedule"] = instance.compensation_schedule.name
        data["currency"] = instance.currency.symbol
        return data


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Document
        fields = [
            "id",
            "name",
            "type",
            "document_url",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.type:
            data["type"] = instance.type.name
        return data


class MeSerializer(serializers.ModelSerializer):
    organization = serializers.CharField(
        source="organization.name",
        default="",
    )
    avatar = serializers.SerializerMethodField()
    contact_number = serializers.CharField(source="employee.contact_number")

    class Meta:
        model = models.User
        fields = [
            "first_name",
            "last_name",
            "email",
            "organization",
            "avatar",
            "is_superuser",
            "headline",
            "contact_number",
        ]


class InstitueSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Institute
        fields = "__all__"


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Program
        fields = "__all__"
