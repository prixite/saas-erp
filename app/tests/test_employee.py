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
                "user_allowed",
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

    def test_benefit_post(self):
        self.client.force_login(self.owner)
        benefit_data = {"name": "Paid leaves"}
        response = self.client.post("/api/benefits/", data=benefit_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class CompanyTestCase(BaseTestCase):
    def test_companies_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/companies/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_company_post(self):
        self.client.force_login(self.owner)
        company_data = {"name": "Netsol"}
        response = self.client.post("/api/companies/", data=company_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class CompensationTypeTestCase(BaseTestCase):
    def test_compensation_types_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/compensation_type/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

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


class CompensationScheduleTestCase(BaseTestCase):
    def test_compensation_schedules_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/compensation_schedule/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

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


class CurrencyTestCase(BaseTestCase):
    def test_currencies_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/currency/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_currency_post(self):
        self.client.force_login(self.owner)
        currency_data = {"code": "USD", "symbol": "$"}
        response = self.client.post("/api/currency/", data=currency_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class DepartmentTestCase(BaseTestCase):
    def test_departments_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/department/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_department_post(self):
        self.client.force_login(self.owner)
        department_data = {"name": "Frontend"}
        response = self.client.post("/api/department/", data=department_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class DocumentTypeTestCase(BaseTestCase):
    def test_document_types_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/document_type/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_document_type_post(self):
        self.client.force_login(self.owner)
        document_type_data = {"name": "Contracts"}
        response = self.client.post("/api/document_type/", data=document_type_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class EmployeementTypeTestCase(BaseTestCase):
    def test_employeement_types_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/employeement_type/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_employeement_type_post(self):
        self.client.force_login(self.owner)
        employeement_type_data = {"name": "Contracts"}
        response = self.client.post(
            "/api/employeement_type/", data=employeement_type_data
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class InstitueTestCase(BaseTestCase):
    def test_institue_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/institues/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_institues_post(self):
        self.client.force_login(self.owner)
        institue_data = {"name": "NUST"}
        response = self.client.post("/api/institues/", data=institue_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ProgamTestCase(BaseTestCase):
    def test_programs_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/programs/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_program_post(self):
        self.client.force_login(self.owner)
        program_data = {"name": "NUST"}
        response = self.client.post("/api/programs/", data=program_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class AssetTypeTestCase(BaseTestCase):
    def asset_types_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/asset_type/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def asset_type_post(self):
        self.client.force_login(self.owner)
        asset_Type_data = {"name": "LCD", "attributes": {}}
        response = self.client.post("/api/asset_type/", data=asset_Type_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class RoleTestCase(BaseTestCase):
    def test_programs_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/role/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AttendaceTestCase(BaseTestCase):
    def test_programs_get(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/attendance/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
