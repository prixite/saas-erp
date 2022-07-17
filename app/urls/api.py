from django.urls import path

from app.views import api

urlpatterns = [
    path(
        "users/",
        api.UserViewSet.as_view(
            {
                "get": "list",
            }
        ),
    ),
    path(
        "employees/",
        api.EmployeeViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
]
