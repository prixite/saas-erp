from django.db import models


class Employee(models.Model):
    name = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=20)
    nic = models.CharField(max_length=25)
    date_of_joining = models.DateField()
    emergency_contact_number = models.CharField(max_length=20)
    department = models.ForeignKey("Department", on_delete=models.SET_NULL, null=True)
    manager = models.ForeignKey(
        "self", null=True, on_delete=models.SET_NULL, related_name="manages"
    )
    organization = models.ForeignKey("Organization", on_delete=models.PROTECT)
    benefits = models.ManyToManyField("Benefit")
    type = models.ForeignKey(
        "EmploymentType", on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Document(models.Model):
    employee = models.ForeignKey("Employee", on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    document_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class DocumentType(models.Model):
    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Team(models.Model):
    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.PROTECT)
    members = models.ManyToManyField("Employee")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Degree(models.Model):
    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="degrees"
    )
    program = models.ForeignKey("Program", on_delete=models.PROTECT)
    institute = models.ForeignKey("Institute", on_delete=models.PROTECT)
    grade = models.CharField(max_length=4)
    year = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Program(models.Model):
    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Institute(models.Model):
    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Benefit(models.Model):
    name = models.CharField(max_length=64)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Department(models.Model):
    name = models.CharField(max_length=64)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class EmploymentType(models.Model):
    name = models.CharField(max_length=64)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
