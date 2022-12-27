from rest_framework import status

from app.tests.base import BaseTestCase


class FlagsTestCase(BaseTestCase):
    def test_flags(self):
        self.client.force_token_login(self.super_user)
        response = self.client.get("/api/flags/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
