from rest_framework import status

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

    def test_user_reset_password(self):
        data = {"email": "user@example.com"}
        response = self.client.post("/api/password-reset/", data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_reset_password_negative(self):
        data = {"email": "fake@example.com"}
        response = self.client.post("/api/password-reset/", data=data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_login(self):
        login_data = {"email": "user@example.com", "password": "admin"}
        response = self.client.post("/api/login/", data=login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_invalid_credential(self):
        login_data = {"email": "user@example.com", "password": "admin1"}
        response = self.client.post("/api/login/", data=login_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_user(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/users/{self.org_user.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_user_negative(self):
        self.client.force_login(self.owner)
        response = self.client.delete(f"/api/users/{self.owner.id}/")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_onboarding(self):
        onboarding_data = {
            "first_name": "Test",
            "last_name": "Owner",
            "email": "test_onwer@gmail.com",
            "organization": {"name": "Test organization", "address": "USA"},
        }
        response = self.client.post("/api/owner/onboard/", data=onboarding_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ModuleFilterTestCase(BaseTestCase):
    def test_get_module_filter_data(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/organization_modules/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserFilterTestCase(BaseTestCase):
    def test_get_user_filter_data(self):
        self.client.force_login(self.owner)
        response = self.client.get("/api/users/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserModuleRoleTestCase(BaseTestCase):
    def test_get_user_list(self):
        self.client.force_login(self.owner)
        response = self.client.get(f"/api/users/{self.owner.id}/access/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
