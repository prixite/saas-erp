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
    type = models.ForeignKey("EmploymentType", on_delete=models.PROTECT, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Document(models.Model):
    """
    The documents will be uploaded to cloud storage. We will only store URL of
    the document in this model.
    """

    employee = models.ForeignKey("Employee", on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    type = models.ForeignKey("DocumentType", on_delete=models.PROTECT, null=True)
    document_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class DocumentType(models.Model):
    """
    Currently we support the following document types:
    - NDA
    - Experience Letter
    - Offer letter
    - Acceptance letter
    - Job Contract
    - Contractor Agreement
    """

    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Team(models.Model):
    """
    Teams define an organization level in a organization. An employee can be
    part of multiple teams.
    """

    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.PROTECT)
    members = models.ManyToManyField("Employee")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Degree(models.Model):
    """
    The educational degrees of an employee.
    """

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
    """
    Currently we support the following programs:
    - Bachelors
    - Masters
    """

    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Institute(models.Model):
    """
    Educational institutes.
    """

    name = models.CharField(max_length=128)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Benefit(models.Model):
    """
    Currently benefits are just used for information. We don't do any
    calculation using them in the first phase. Benefits examples:
    - Petrol Allowance
    - Paid Leaves
    - Quarterly Bonus
    """

    name = models.CharField(max_length=64)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Department(models.Model):
    """
    Currently we support the following departments:
    - Engineering
    - Quality Assurance
    - HR
    - Design
    - Operations
    - Accounts
    """

    name = models.CharField(max_length=64)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class EmploymentType(models.Model):
    """
    Currently we support the following types:
    - Full Time
    - Part Time
    - Contractor
    - Probation
    - Intern
    """

    name = models.CharField(max_length=64)
    organization = models.ForeignKey("Organization", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name
