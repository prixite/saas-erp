from rest_framework import status

from app import models
from app.tests.base import BaseTestCase


class EmployeeTestCase(BaseTestCase):
    def test_employee_post(self):
        self.client.force_login(self.owner)

        employee_data = {
            "user": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "employee@example.com",
                "contact_number": "+424234424432",
                "default_role": self.member_role.id,
            },
            "nic": "213342343242",
            "date_of_joining": "2022-11-15",
            "emergency_contact_number": "1234324234",
            "designation": "Software Engineer",
            "degrees": [
                {
                    "program": self.program.id,
                    "institute": self.institute.id,
                    "year": "2018-12-08",
                }
            ],
            "experience": [
                {
                    "title": "Internee",
                    "company": self.company.id,
                    "start_date": "2018-12-08",
                    "end_date": "2020-12-08",
                }
            ],
            "assets": [
                {
                    "name": "Dell latitude",
                    "attribute_values": {},
                    "type": self.asset_type.id,
                }
            ],
            "managing": [self.employee.id],
            "organization": self.organization.id,
        }

        response = self.client.post("/api/employees/", data=employee_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        employee_data.pop("user")
        employee_data.pop("degrees")
        employee_data.pop("experience")
        employee_data.pop("assets")
        employee_data.pop("managing")
        self.assertTrue(models.Employee.objects.filter(**employee_data).exists())

    def test_employee_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/employees/{self.employee.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "user",
                "degrees",
                "assets",
                "experience",
                "org_id",
                "total_experience",
                "nic",
                "date_of_joining",
                "emergency_contact_number",
                "designation",
                "salary",
                "leave_count",
                "user_allowed",
                "availability_start_time",
                "availability_end_time",
                "weekly_available_hours",
                "monthly_available_hours",
                "availability_last_msg",
                "created_at",
                "updated_at",
                "department",
                "manager",
                "type",
                "benefits",
                "organization",
                "manages",
            ],
        )

    def test_employee_put(self):
        self.client.force_login(self.owner)
        employee_data = {
            "user": {
                "first_name": "John",
                "last_name": "Doe",
                "contact_number": "+4240004432",
                "default_role": self.member_role.id,
            },
            "date_of_joining": "2022-11-15",
            "emergency_contact_number": "1234324234",
            "designation": "Software Engineer",
            "degrees": [
                {
                    "program": self.program.id,
                    "institute": self.institute.id,
                    "year": "2018-12-08",
                }
            ],
            "experience": [
                {
                    "title": "Internee",
                    "company": self.company.id,
                    "start_date": "2018-12-08",
                    "end_date": "2020-12-08",
                },
                {
                    "title": "Junior developer",
                    "company": self.company.id,
                    "start_date": "2018-12-08",
                    "end_date": "2020-12-08",
                },
            ],
            "assets": [
                {
                    "name": "Macbook pro",
                    "attribute_values": {},
                    "type": self.asset_type.id,
                }
            ],
            "managing": [],
        }

        response = self.client.put(
            f"/api/employees/{self.employee.id}/", data=employee_data
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_employee_list(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/employees/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "org_id",
                "first_name",
                "last_name",
                "contact_number",
                "date_of_joining",
                "image",
            ],
        )

    def test_employee_detail_negative(self):
        self.client.force_login(self.org_user_2)
        response = self.client.get(f"/api/employees/{self.employee.id}/")

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_employee_list_neagtive(self):
        self.client.force_login(self.super_user)
        response = self.client.get("/api/employees/")

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class CompensationTestCase(BaseTestCase):
    def test_compensation_post(self):
        self.client.force_login(self.owner)

        compensation_data = {
            "rate": "10",
            "max_hours_per_week": "5",
            "expected_hours_per_week": "5",
            "compensation_type": self.compensation_type.id,
            "compensation_schedule": self.compensation_schedule.id,
            "currency": self.currency.id,
        }

        self.client.post(
            f"/api/employees/{self.employee.id}/compensation/", data=compensation_data
        )
        self.assertTrue(
            models.Compensation.objects.filter(employee=self.employee.id).exists()
        )

    def test_compensation_get(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/employees/{self.employee.id}/compensation/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class DocumentTestCase(BaseTestCase):
    def test_document_get(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/employees/{self.employee.id}/documents/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_document_post(self):
        self.client.force_login(self.owner)
        doc_data = {
            "name": "Experience letter",
            "type": self.document_type.id,
            "document_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",  # noqa
        }
        response = self.client.post(
            f"/api/employees/{self.employee.id}/documents/", data=doc_data
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class BenefitsTestCase(BaseTestCase):
    def test_benefits_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/benefits/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        )

    def test_benefit_post(self):
        self.client.force_login(self.owner)
        benefit_data = {"name": "Paid leaves"}
        response = self.client.post("/api/benefits/", data=benefit_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(models.Benefit.objects.filter(**benefit_data).exists())

    def test_benefit_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/benefits/{self.benefit.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        )

    def test_benefit_put(self):
        self.client.force_login(self.owner)
        benefit_data = {"name": "Sick leaves"}
        response = self.client.put(
            f"/api/benefits/{self.benefit.id}/", data=benefit_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_benefit_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/benefits/{self.benefit.id}/")
        self.assertEqual(response.status_code, 204)


class CompanyTestCase(BaseTestCase):
    def test_companies_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/companies/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "name",
                "image",
                "created_at",
                "updated_at",
            ],
        )

    def test_company_post(self):
        self.client.force_login(self.owner)
        company_data = {"name": "Netsol"}
        response = self.client.post("/api/companies/", data=company_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(models.Company.objects.filter(**company_data).exists())

    def test_companies_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/companies/{self.company.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "name",
                "image",
                "created_at",
                "updated_at",
            ],
        )

    def test_companies_put(self):
        self.client.force_login(self.owner)
        company_data = {"name": "Confiz"}
        response = self.client.put(
            f"/api/companies/{self.company.id}/", data=company_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_companies_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/companies/{self.company.id}/")
        self.assertEqual(response.status_code, 204)


class CompensationTypeTestCase(BaseTestCase):
    def test_compensation_types_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/compensation_type/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "name",
                "is_hourly",
                "is_monthly",
                "is_milestone",
                "created_at",
                "updated_at",
            ],
        )

    def test_compensation_type_post(self):
        self.client.force_login(self.owner)
        compensation_type_data = {
            "name": "Hourly compensation",
            "is_hourly": True,
        }
        response = self.client.post(
            "/api/compensation_type/", data=compensation_type_data
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            models.CompensationType.objects.filter(**compensation_type_data).exists()
        )

    def test_compensation_types_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(
            f"/api/compensation_type/{self.compensation_type.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "name",
                "is_hourly",
                "is_monthly",
                "is_milestone",
                "created_at",
                "updated_at",
            ],
        )

    def test_compensation_types_put(self):
        self.client.force_login(self.owner)
        compensation_type_data = {"name": "Monthly", "is_monthly": True}
        response = self.client.put(
            f"/api/compensation_type/{self.compensation_type.id}/",
            data=compensation_type_data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_companensation_types_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(
            f"/api/compensation_type/{self.compensation_type.id}/"
        )
        self.assertEqual(response.status_code, 400)


class CompensationScheduleTestCase(BaseTestCase):
    def test_compensation_schedules_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/compensation_schedule/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "name",
                "is_weekly",
                "is_monthly",
                "created_at",
                "updated_at",
            ],
        )

    def test_compensation_schedule_post(self):
        self.client.force_login(self.owner)
        compensation_schedule_data = {
            "name": "Weekly Schedule",
            "is_weekly": True,
        }
        response = self.client.post(
            "/api/compensation_schedule/", data=compensation_schedule_data
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            models.CompensationSchedule.objects.filter(
                **compensation_schedule_data
            ).exists()
        )

    def test_compensation_schedules_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(
            f"/api/compensation_schedule/{self.compensation_schedule.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "name",
                "is_weekly",
                "is_monthly",
                "created_at",
                "updated_at",
            ],
        )

    def test_compensation_schedules_put(self):
        self.client.force_login(self.owner)
        compensation_scedule_data = {"name": "Monthly Schedule", "is_monthly": True}
        response = self.client.put(
            f"/api/compensation_schedule/{self.compensation_schedule.id}/",
            data=compensation_scedule_data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_companensation_schedules_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(
            f"/api/compensation_schedule/{self.compensation_schedule.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class CurrencyTestCase(BaseTestCase):
    def test_currencies_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/currency/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "code",
                "symbol",
                "created_at",
                "updated_at",
            ],
        )

    def test_currency_post(self):
        self.client.force_login(self.owner)
        currency_data = {"code": "PKR", "symbol": "R"}
        response = self.client.post("/api/currency/", data=currency_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(models.Currency.objects.filter(**currency_data).exists())

    def test_currency_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/currency/{self.currency.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "code",
                "symbol",
                "created_at",
                "updated_at",
            ],
        )

    def test_currency_put(self):
        self.client.force_login(self.owner)
        currency_data = {"code": "USD", "symbol": "$"}
        response = self.client.put(
            f"/api/currency/{self.currency.id}/", data=currency_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_currency_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/currency/{self.currency.id}/")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DepartmentTestCase(BaseTestCase):
    def test_departments_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/department/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        )

    def test_department_post(self):
        self.client.force_login(self.owner)
        department_data = {"name": "QA"}
        response = self.client.post("/api/department/", data=department_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_department_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/department/{self.department.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        )

    def test_department_put(self):
        self.client.force_login(self.owner)
        department_data = {"name": "Backend"}
        response = self.client.put(
            f"/api/department/{self.department.id}/", data=department_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_department_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/department/{self.department.id}/")
        self.assertEqual(response.status_code, 204)


class DocumentTypeTestCase(BaseTestCase):
    def test_document_types_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/document_type/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        )

    def test_document_type_post(self):
        self.client.force_login(self.owner)
        document_type_data = {"name": "Contracts"}
        response = self.client.post("/api/document_type/", data=document_type_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            models.DocumentType.objects.filter(**document_type_data).exists()
        )

    def test_document_type_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/document_type/{self.document_type.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        )

    def test_document_type_put(self):
        self.client.force_login(self.owner)
        document_type_data = {"name": "CV"}
        response = self.client.put(
            f"/api/document_type/{self.document_type.id}/", data=document_type_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_document_type_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/document_type/{self.document_type.id}/")
        self.assertEqual(response.status_code, 204)


class EmployeementTypeTestCase(BaseTestCase):
    def test_employeement_types_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/employeement_type/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        )

    def test_employeement_type_post(self):
        self.client.force_login(self.owner)
        employeement_type_data = {"name": "Contracts"}
        response = self.client.post(
            "/api/employeement_type/", data=employeement_type_data
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            models.EmploymentType.objects.filter(**employeement_type_data).exists()
        )

    def test_employeement_type_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/employeement_type/{self.employment_type.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        )

    def test_employeement_type_put(self):
        self.client.force_login(self.owner)
        employment_type_data = {"name": "Part Time"}
        response = self.client.put(
            f"/api/employeement_type/{self.employment_type.id}/",
            data=employment_type_data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_employeement_type_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(
            f"/api/employeement_type/{self.employment_type.id}/"
        )
        self.assertEqual(response.status_code, 204)


class InstitueTestCase(BaseTestCase):
    def test_institue_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/institues/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "name",
                "image",
                "created_at",
                "updated_at",
            ],
        )

    def test_institues_post(self):
        self.client.force_login(self.owner)
        institue_data = {"name": "NUST"}
        response = self.client.post("/api/institues/", data=institue_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(models.Institute.objects.filter(**institue_data).exists())

    def test_institutes_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/institues/{self.institute.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "name",
                "image",
                "created_at",
                "updated_at",
            ],
        )

    def test_institutes_put(self):
        self.client.force_login(self.owner)
        institute_data = {"name": "FAST"}
        response = self.client.put(
            f"/api/institues/{self.institute.id}/", data=institute_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_institutes_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/institues/{self.institute.id}/")
        self.assertEqual(response.status_code, 204)


class ProgamTestCase(BaseTestCase):
    def test_programs_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/programs/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        )

    def test_program_post(self):
        self.client.force_login(self.owner)
        program_data = {"name": "NUST"}
        response = self.client.post("/api/programs/", data=program_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(models.Program.objects.filter(**program_data).exists())

    def test_program_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/programs/{self.program.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "name",
                "created_at",
                "updated_at",
            ],
        )

    def test_program_put(self):
        self.client.force_login(self.owner)
        program_data = {"name": "Masters"}
        response = self.client.put(
            f"/api/programs/{self.program.id}/", data=program_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_program_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/programs/{self.program.id}/")
        self.assertEqual(response.status_code, 204)


class AssetTypeTestCase(BaseTestCase):
    def asset_types_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/asset_type/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "attributes",
                "first_name",
                "last_name",
                "contact_number",
                "date_of_joining",
                "image",
            ],
        )

    def asset_type_post(self):
        self.client.force_login(self.owner)
        asset_Type_data = {"name": "LCD", "attributes": {}}
        response = self.client.post("/api/asset_type/", data=asset_Type_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # self.assertTrue(models.AssetType.objects.filter(**asset_Type_data).exists())

    def asset_types_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/asset_type/{self.asset_type.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            [
                "id",
                "attributes",
                "created_at",
                "updated_at",
            ],
        )

    def asset_types_put(self):
        self.client.force_login(self.owner)
        asset_type_data = {
            "name": "Mouse",
            "organization": self.organization,
            "attributes": {},
        }
        response = self.client.put(
            f"/api/asset_type/{self.asset_type.id}/", data=asset_type_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def asset_types_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/asset_type/{self.asset_type.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class RoleTestCase(BaseTestCase):
    def test_programs_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/role/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AttendaceTestCase(BaseTestCase):
    def test_programs_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/attendance/?id=2")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaveTesCase(BaseTestCase):
    def test_get_all_leaves(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/attendance/?id=2")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class StandupTestCase(BaseTestCase):
    def test_standup_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/standup/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            list(response.json()[0].keys()),
            ["id", "name", "time", "created_at", "updated_at", "team"],
        )

    def test_standup_post(self):
        self.client.force_login(self.owner)
        standup_data = {
            "name": "Standup",
            "team": self.team1.id,
            "time": "01:52:00+05:00",
        }
        response = self.client.post("/api/standup/", data=standup_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(models.Standup.objects.filter(**standup_data).exists())

    def test_standup_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/standup/{self.standup.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json().keys()),
            ["id", "name", "time", "created_at", "updated_at", "team"],
        )

    def test_standup_get_members(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/standup/{self.standup.id}/members/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            list(response.json()[0].keys()),
            [
                "id",
                "org_id",
                "first_name",
                "last_name",
                "contact_number",
                "date_of_joining",
                "image",
            ],
        )

    def test_standup_put(self):
        self.client.force_login(self.owner)
        standup_data = {
            "name": "Standup-Team-1",
            "team": self.team1.id,
            "time": "01:52:00+05:00",
        }
        response = self.client.put(
            f"/api/standup/{self.standup.id}/", data=standup_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_standup_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/standup/{self.standup.id}/")
        self.assertEqual(response.status_code, 204)


class StandupUpdateTestCase(BaseTestCase):
    def test_standupUpdate_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/standup_update/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(
            sorted(list(response.json()[0].keys())),
            sorted(
                [
                    "id",
                    "date",
                    "standup",
                    "employee",
                    "status",
                    "work_done_yesterday",
                    "work_to_do",
                    "blockers",
                    "created_at",
                    "updated_at",
                ]
            ),
        )

    def test_standupUpdate_post(self):
        self.client.force_login(self.owner)
        standup_update_data = {
            "standup": self.standup.id,
            "organization": self.organization.id,
            "employee": self.employee.id,
            "status": "joined",
            "work_done_yesterday": "Worked on standup API",
            "work_to_do": "Will work on saas erp",
            "blockers": "Requirements are unclear",
        }
        response = self.client.post("/api/standup_update/", data=standup_update_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            models.StandupUpdate.objects.filter(**standup_update_data).exists()
        )

    def test_standupUpdate_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/standup_update/{self.standup_update.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            sorted(list(response.json().keys())),
            sorted(
                [
                    "id",
                    "date",
                    "standup",
                    "employee",
                    "status",
                    "work_done_yesterday",
                    "work_to_do",
                    "blockers",
                    "created_at",
                    "updated_at",
                ]
            ),
        )

    def test_standupUpdate_put(self):
        self.client.force_login(self.owner)
        standup_update_data = {
            "standup": self.standup.id,
            "organization": self.organization.id,
            "employee": self.employee.id,
            "status": "leave",
        }
        response = self.client.put(
            f"/api/standup_update/{self.standup_update.id}/", data=standup_update_data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_standupUpdate_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/standup_update/{self.standup_update.id}/")
        self.assertEqual(response.status_code, 204)


class TeamTestCase(BaseTestCase):
    def test_team_post(self):
        self.client.force_login(self.owner)
        team_data = {
            "name": "Test Team",
            "organization": self.organization.id,
            "members": [self.employee.id],
        }
        response = self.client.post("/api/team/", data=team_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(models.Team.objects.filter(name=team_data["name"]).exists())

    def test_team_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/team/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(
            sorted(list(response.json()[0].keys())),
            sorted(
                [
                    "id",
                    "name",
                    "members",
                    "created_at",
                    "updated_at",
                ]
            ),
        )

    def test_team_detail(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/team/{self.team.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            sorted(list(response.json().keys())),
            sorted(
                [
                    "id",
                    "name",
                    "members",
                    "created_at",
                    "updated_at",
                ]
            ),
        )

    def test_team_put(self):
        self.client.force_login(self.owner)
        team_data = {
            "name": "Standup-team-2",
            "organization": self.organization.id,
            "members": [self.employee.id],
        }
        response = self.client.put(f"/api/team/{self.team.id}/", data=team_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_team_delete(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/team/{self.team.id}/")
        self.assertEqual(response.status_code, 204)
