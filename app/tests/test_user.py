from rest_framework import status
from rest_framework.authtoken.models import Token

from app.tests.base import BaseTestCase


class UserTestCase(BaseTestCase):
    def test_user_change_password(self):
        self.org_user.set_password("admin")
        self.org_user.save()
        self.client.force_login(self.org_user)
        user_data = {"password": "pakistan123!", "old_password": "admin"}
        response = self.client.patch("/api/change_password/", data=user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_change_password_negative(self):
        self.org_user.set_password("admin")
        self.org_user.save()
        self.client.force_login(self.org_user)

        user_data = {"password": "pakistan123!", "old_password": "admin123"}
        response = self.client.patch("/api/change_password/", data=user_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login(self):
        login_data = {"email": "user@example.com", "password": "admin"}
        response = self.client.post("/api/login/", data=login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
