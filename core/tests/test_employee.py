from core.tests.base import BaseTestCase
from rest_framework import status

class EmployeeTestCase(BaseTestCase):
    def test_employee_list(self):
        self.client.force_login(self.super_user)
        response = self.client.get('/api/employees/')
        
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.json()),11)
        self.assertEqual(list(response.json()[0].keys()),[
            "name",
            "contact_number",
            "nic",
            "emergency_contact_number",
            "date_of_joining","last_employer_salary_slip"
        ])