from django.urls import path

from app import views

urlpatterns = [
    path(
        "users/",
        views.UserViewSet.as_view(
            {
                "get": "list",
            }
        ),
    ),
    path(
        "employees/",
        views.EmployeeViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
]
