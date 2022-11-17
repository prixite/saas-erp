from rest_framework import serializers

from app import models


class EmployeeListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    image = serializers.ImageField(source="user.image", read_only=True)
    id = serializers.CharField()

    class Meta:
        model = models.Employee
        fields = [
            "id",
            "_id",
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
    _id = serializers.CharField()

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
