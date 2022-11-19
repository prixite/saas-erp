from django.conf import settings
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

    class Meta:
        model = models.Employee

        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = models.User.objects.create(
            username=user_data["email"],
            first_name=user_data["first_name"],
        )
        return models.Employee.objects.create(user=user, **validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["organization"] = instance.organization.name
        if instance.department:
            data["department"] = instance.department.name
        if instance.manager:
            data["manager"] = instance.manager.user.get_full_name()
        if instance.type:
            data["type"] = instance.type.name
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
            "name",
            "type",
            "document_url",
        ]


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

    def get_avatar(self, data):
        return f"{settings.DOMAIN_NAME}{data.image.url}"
