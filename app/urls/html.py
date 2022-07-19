from django.urls import path

from app.views import html as views

app_name = "html"

urlpatterns = [
    path("", views.Home.as_view(), name="home"),
    path("users/", views.Users.as_view(), name="users"),
    path("users/add/", views.CreateUser.as_view(), name="users-add"),
    path("users/<int:pk>/", views.UpdateUser.as_view(), name="users-update"),
    path("users/<int:pk>/delete/", views.DeleteUser.as_view(), name="users-delete"),
    path("employees/", views.Employees.as_view(), name="employees"),
    path("payroll/", views.Payroll.as_view(), name="payroll"),
    path("inventory/", views.Inventory.as_view(), name="inventory"),
    path("settings/", views.Settings.as_view(), name="settings"),
    path("account/", views.Account.as_view(), name="account"),
]
