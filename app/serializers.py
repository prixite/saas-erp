from datetime import date

from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.exceptions import NotFound, PermissionDenied
from waffle import get_waffle_switch_model

from app import models


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        label="Password",
        style={"input_type": "password"},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), email=email, password=password
            )
            if not user:
                msg = {"error": "Please enter correct Email/Password."}
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = {"error": "Must include 'email' and 'password'."}
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Degree
        fields = ["program", "institute", "year"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["program"] = {"id": instance.program.id, "name": instance.program.name}
        data["institute"] = {
            "id": instance.institute.id,
            "name": instance.institute.name,
        }
        return data


class ExperirenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Experience
        fields = ["title", "company", "start_date", "end_date"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["company"] = {
            "id": instance.company.id,
            "name": instance.company.name,
        }
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


class AssetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AssetType
        exclude = ("organization",)


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Asset
        exclude = ("organization", "employee")


class EmployeeUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

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

    def validate_email(self, value):
        organization = self.context.get("request").user.organization

        if models.Employee.all_objects.filter(
            organization=organization, user__email=value
        ).exists():
            raise serializers.ValidationError(
                "employee with this email already exists."
            )
        if models.User.all_objects.filter(
            ~Q(organization=organization) & Q(email=value)
        ).exists():
            raise serializers.ValidationError("user with this email already exists.")
        return value


class EmployeeUpdateUserSerializer(EmployeeUserSerializer):
    email = serializers.EmailField(read_only=True)


class ManagerSerializer(serializers.ModelSerializer):

    name = serializers.CharField(source="user.get_full_name")

    class Meta:
        model = models.Employee
        fields = "id", "name"


class EmployeeSerializer(serializers.ModelSerializer):
    user = EmployeeUserSerializer()
    degrees = DegreeSerializer(many=True)
    assets = AssetSerializer(many=True)
    experience = ExperirenceSerializer(many=True)
    org_id = serializers.CharField(read_only=True)
    managing = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=models.Employee.objects.all(), many=True
    )
    total_experience = serializers.SerializerMethodField()

    class Meta:
        model = models.Employee
        exclude = ("organization", "slack_id", "deleted_at", "is_deleted")

    @transaction.atomic
    def create(self, validated_data):
        user_data = validated_data.pop("user")
        degrees_data = validated_data.pop("degrees")
        experience_data = validated_data.pop("experience")
        assets_data = validated_data.pop("assets")
        managing = validated_data.pop("managing")
        if user_data.get("default_role"):
            user_data["default_role"] = user_data.pop("default_role").id
        organization = self.context.get("request").user.organization
        try:
            user = models.User.objects.get(email=user_data.get("email"))
            user_ser = EmployeeUserSerializer(
                data=user_data, instance=user, context=self.context
            )
        except models.User.DoesNotExist:
            user_ser = EmployeeUserSerializer(data=user_data, context=self.context)
        user_ser.is_valid(raise_exception=True)
        user = user_ser.save(
            is_active=validated_data.get("user_allowed", False),
            username=user_data.get("email"),
            organization=organization,
        )
        validated_data["user_id"] = user.id
        employee = super().create(validated_data)

        for manages in managing:
            emp = models.Employee.objects.get(id=manages.id)
            emp.manager = employee
            emp.save()
        for degree in degrees_data:
            models.Degree.objects.create(**degree, employee=employee)
        for experience in experience_data:
            models.Experience.objects.create(**experience, employee=employee)
        for asset in assets_data:
            models.Asset.objects.create(
                **asset, employee=employee, organization=organization
            )

        return employee

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

    def validate(self, data):
        organization = self.context.get("request").user.organization

        if models.Employee.all_objects.filter(nic=data.get("nic")).exists():
            raise serializers.ValidationError("employee with this nic already exists.")
        if data.get("manager") and not data.get("manager").organization == organization:
            raise serializers.ValidationError("Manager employee does not exists.")
        for manages in data.get("managing"):
            if not manages.organization == organization:
                raise serializers.ValidationError("Managing employee does not exists.")
            if manages == data.get("manager"):
                raise serializers.ValidationError(
                    "Employee can not be the manager of his own manager."
                )
        return data

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["organization"] = instance.organization.name
        data["manages"] = ManagerSerializer(instance.manages.all(), many=True).data
        if instance.department:
            data["department"] = {
                "id": instance.department.id,
                "name": instance.department.name,
            }
        if instance.manager:
            data["manager"] = {
                "id": instance.manager.id,
                "name": instance.manager.user.get_full_name(),
            }
        if instance.type:
            data["type"] = {"id": instance.type.id, "title": instance.type.name}
        if instance.benefits:
            data["benefits"] = BenefitSerializer(
                instance.benefits.all(), many=True
            ).data
        return data


class EmployeeListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    contact_number = serializers.CharField(source="user.contact_number", read_only=True)
    image = serializers.CharField(source="user.image", read_only=True)

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


class EmployeeUpdateSerializer(EmployeeSerializer):
    user = EmployeeUpdateUserSerializer()

    class Meta:
        model = models.Employee
        exclude = ("nic", "date_of_joining", "slack_id", "organization")

    @transaction.atomic
    def update(self, instance, validated_data):
        organization = self.context.get("request").user.organization
        user_data = validated_data.pop("user")
        degrees_data = validated_data.pop("degrees")
        experience_data = validated_data.pop("experience")
        assets_data = validated_data.pop("assets")
        managing = validated_data.pop("managing")
        if user_data.get("default_role"):
            user_data["default_role"] = user_data.pop("default_role").id
        user = models.User.objects.get(email=instance.user.email)
        user_ser = EmployeeUpdateUserSerializer(instance=user, data=user_data)
        user_ser.is_valid(raise_exception=True)
        user.is_active = validated_data.get("user_allowed", False)
        user_ser.save()

        models.Degree.objects.filter(employee=instance).delete()
        models.Asset.objects.filter(employee=instance).delete()
        models.Experience.objects.filter(employee=instance).delete()
        models.Employee.objects.filter(manager=instance).update(manager=None)

        for manages in managing:
            emp = models.Employee.objects.get(id=manages.id)
            emp.manager = instance
            emp.save()
        for degree in degrees_data:
            models.Degree.objects.create(**degree, employee=instance)
        for experience in experience_data:
            models.Experience.objects.create(**experience, employee=instance)
        for asset in assets_data:
            models.Asset.objects.create(
                **asset, employee=instance, organization=organization
            )

        return super().update(instance, validated_data)


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
    emp_id = serializers.IntegerField(
        source="employee.id",
        default=None,
    )
    allowed_modules = serializers.SerializerMethodField()

    class Meta:
        model = models.User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "organization",
            "image",
            "is_superuser",
            "headline",
            "contact_number",
            "allowed_modules",
            "emp_id",
        ]

    def get_allowed_modules(self, data):
        member_modules = [module.slug for module in data.member_modules]
        admin_modules = [module.slug for module in data.admin_modules]
        owner_modules = [module.slug for module in data.owner_modules]

        return {
            "member_modules": member_modules,
            "admin_modules": admin_modules,
            "owner_modules": owner_modules,
        }


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


class ResendEmailCodeSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


class PasswordResetConfirmSerializer(serializers.Serializer):
    uidb64 = serializers.CharField(required=True)
    token = serializers.CharField(required=True)


class PasswordResetCompleteSerializer(serializers.Serializer):
    uidb64 = serializers.CharField(required=True)
    password = serializers.CharField(required=True, validators=[validate_password])
    password2 = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs


class WaffleSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_waffle_switch_model()
        fields = ["name", "active"]


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Attendance
        fields = ["employee", "time_in", "time_out"]


class MeUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = (
            "first_name",
            "last_name",
            "image",
            "contact_number",
            "headline",
        )


class MeUpdateNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = (
            "bill_update_email",
            "bill_update_phone",
            "new_team_member_email",
            "new_team_member_phone",
            "newsletters_email",
            "newsletters_phone",
        )


class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Leave
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["employee"] = {
            "id": instance.employee.id,
            "name": instance.employee.user.get_full_name(),
            "image": instance.employee.user.image,
            "department": instance.employee.department.name
            if instance.employee.department
            else None,
        }

        return data


class LeaveUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Leave
        fields = ("status", "hr_comment", "leave_type")


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Organization
        fields = "__all__"


class OwnerEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = ("date_of_joining", "nic")


class OwnerOnBoardingSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer()
    employee = OwnerEmployeeSerializer(required=False)

    class Meta:
        model = models.User
        fields = ("first_name", "last_name", "email", "organization", "employee")

    @transaction.atomic
    def create(self, validated_data):
        org_serializer = OrganizationSerializer(data=validated_data.pop("organization"))
        org_serializer.is_valid(raise_exception=True)
        organization = org_serializer.save()
        models.Role.objects.bulk_create(
            [
                models.Role(
                    name="Owner",
                    permission=models.Role.Permission.OWNER,
                    is_default=True,
                    organization=organization,
                ),
                models.Role(
                    name="Admin",
                    permission=models.Role.Permission.ADMIN,
                    is_default=True,
                    organization=organization,
                ),
                models.Role(
                    name="Member",
                    permission=models.Role.Permission.MEMBER,
                    is_default=True,
                    organization=organization,
                ),
            ]
        )
        for module in models.Module.objects.filter(is_enabled=True):
            models.OrganizationModule.objects.create(
                organization=organization,
                module=module,
                is_enabled=True,
            )
        validated_data["username"] = validated_data.get("email")
        validated_data["organization"] = organization
        validated_data["default_role"] = models.Role.objects.filter(
            organization=organization,
            permission=models.Role.Permission.OWNER,
            is_default=True,
        ).first()
        emp_data = validated_data.pop("employee", {})
        user = super().create(validated_data)
        if emp_data:
            emp_ser = OwnerEmployeeSerializer(data=emp_data)
            emp_ser.is_valid(raise_exception=True)
            emp_ser.save(user=user, organization=organization, user_allowed=True)
        return user

    def validate_email(self, value):
        if models.User.all_objects.filter(email=value).exists():
            raise serializers.ValidationError("user with this email already exists.")
        return value


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Organization
        fields = "__all__"


class OrganizationModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrganizationModule
        fields = "__all__"

    def validate(self, attrs):
        if self.context.get("request").method == "POST" and (
            models.OrganizationModule.objects.filter(
                module=attrs.get("module"), organization=attrs.get("organization")
            ).exists()
        ):
            raise serializers.ValidationError(
                "This module already exists in this organization."
            )
        return super().validate(attrs)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["module"] = {"id": instance.module.id, "name": instance.module.name}
        data["organization"] = {
            "id": instance.organization.id,
            "name": instance.organization.name,
        }
        return data


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Module
        fields = "__all__"


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        exclude = ("organization",)

    def validate(self, data):
        user = self.context.get("request").user
        members = data.get("members")
        for member in members:
            if member.organization != user.organization:
                raise NotFound(detail="Employee not found")
        return data


class StandupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Standup
        exclude = ("organization",)

    def validate(self, data):
        user = self.context.get("request").user
        team = data.get("team")
        if team.organization != user.organization:
            raise NotFound(detail="Team not found")
        return data


class StandupUpdateSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()

    class Meta:
        model = models.StandupUpdate
        exclude = ("organization",)

    def validate(self, data):
        user = self.context.get("request").user
        employee = data.get("employee")
        standup = data.get("standup")
        team_members = standup.team.members.all()
        permission = user.default_role.permission
        if permission == models.Role.Permission.MEMBER:
            if not user.employee == employee:
                if employee in team_members and user.employee in team_members:
                    raise PermissionDenied(
                        detail="You are not authorized to add standup updates for your team member."  # noqa
                    )
                else:
                    raise NotFound(detail="Employee not found")

            if employee not in team_members:
                raise NotFound(detail="Standup not found")

        else:
            if employee.organization == user.organization == standup.organization:
                if employee not in team_members:
                    raise serializers.ValidationError(
                        {"detail": "Employee does not belong to this standup"}
                    )
            else:
                raise NotFound(detail="Detail not found")
        return data

    def get_time(self, obj):
        time = obj.standup.created_at.time().strftime("%H:%M %p")
        return time

    def get_date(self, obj):
        date = obj.standup.created_at.date().strftime("%B %d, %Y")
        return date

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["employee"] = {
            "id": instance.employee.id,
            "name": instance.employee.user.get_full_name(),
            "image": instance.employee.user.image,
            "department": instance.employee.department.name
            if instance.employee.department
            else None,
        }
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "image",
            "contact_number",
            "default_role",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.default_role:
            data["default_role"] = instance.default_role.name
        return data


class UserModuleRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserModuleRole
        fields = (
            "id",
            "module",
            "role",
        )

    def create(self, validated_data):
        validated_data["user_id"] = self.context["user_id"]
        return super().create(validated_data)

    def validate(self, data):
        module = data["module"]
        role = data["role"]
        request = self.context["request"]
        modules = models.Module.objects.filter(
            id__in={x.id for x in request.user.organization_modules}
        )
        if request.method == "POST":
            user = get_object_or_404(models.User, id=self.context.get("user_id"))
            if models.UserModuleRole.objects.filter(module=module, user=user).exists():
                raise serializers.ValidationError("This user module already exists.")
        if module not in modules:
            raise serializers.ValidationError("Invalid Module selected")
        roles = models.Role.objects.filter(organization=request.user.organization)
        if role not in roles:
            raise serializers.ValidationError("Invlid role selected")

        return data

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["module"] = {"id": instance.module.id, "name": instance.module.name}
        data["role"] = {"id": instance.role.id, "name": instance.role.name}
        return data
