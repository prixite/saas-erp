from rest_framework import status

from app.tests.base import BaseTestCase


class UserTestCase(BaseTestCase):
    def test_user_change_password(self):
        self.org_user.set_password("admin")
        self.org_user.save()
        self.client.force_login(self.org_user)

        user_data = {"password": "pakistan123!", "old_password": "admin"}
        response = self.client.patch("/api/change_password/", data=user_data)
        self.assertEqual(response.status_code, 200)
