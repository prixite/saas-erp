from datetime import date

from django.conf import settings
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from waffle import get_waffle_switch_model

from app import models


class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Degree
        fields = ["employee", "program", "institute", "year"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["program"] = instance.program.name
        data["institute"] = instance.institute.name
        return data


class ExperirenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Experience
        fields = ["employee", "title", "company", "start_date", "end_date"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["company"] = instance.company.name
        return data


class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Benefit
        exclude = ("organization",)


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
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


class InstitueSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Institute
        exclude = ("organization",)


class CompensationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CompensationType
        exclude = ("organization",)


class CompensationScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CompensationSchedule
        exclude = ("organization",)


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Currency
        exclude = ("organization",)


class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DocumentType
        exclude = ("organization",)


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Role
        exclude = ("organization",)


class EmployeeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = [
            "first_name",
            "last_name",
            "email",
            "image",
            "contact_number",
            "default_role",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["image"] = f"{settings.DOMAIN_NAME}{instance.image.url}"
        return data


class EmployeeSerializer(serializers.ModelSerializer):
    user = EmployeeUserSerializer()
    degrees = DegreeSerializer(many=True, read_only=True)
    experience = ExperirenceSerializer(many=True, read_only=True)
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
        if user_data.get("default_role"):
            user_data["default_role"] = user_data.pop("default_role").id
        organization = self.context.get("request").user.organization
        user_ser = EmployeeUserSerializer(data=user_data)

        user_ser.is_valid(raise_exception=True)
        user = user_ser.save()

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


class EmployeeListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    contact_number = serializers.CharField(source="user.contact_number", read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = models.Employee
        fields = [
            "id",
            "org_id",
            "first_name",
            "last_name",
            "contact_number",
            "date_of_joining",
            "image",
        ]

    def get_image(self, data):
        return f"{settings.DOMAIN_NAME}{data.user.image.url}"


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

    image = serializers.SerializerMethodField()

    allowed_modules = serializers.SerializerMethodField()

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
            "contact_number",
            "allowed_modules",
        ]

    def get_allowed_modules(self, data):
        allowed_modules = []

        for module in self.context.get("request").user.member_modules:
            allowed_modules.append(module.slug)
        for module in self.context.get("request").user.admin_modules:
            allowed_modules.append(module.slug)
        for module in self.context.get("request").user.owner_modules:
            allowed_modules.append(module.slug)

        allowed_modules = list(set(allowed_modules))

        return allowed_modules

    def get_image(self, data):
        return f"{settings.DOMAIN_NAME}{data.image.url}"


class UserPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=8, required=True)
    old_password = serializers.CharField()

    def validate(self, data):
        old_password = data["old_password"]
        password = data["password"]
        if not (self.context["request"].user.check_password(old_password)):
            raise serializers.ValidationError("Old password does not match.")  # noqa
        if password == old_password:
            raise serializers.ValidationError(
                "New password can not be same as new password."
            )
        return data


class WaffleSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_waffle_switch_model()
        fields = ["name", "active"]
