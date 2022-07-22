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
    path("roles/", views.Roles.as_view(), name="roles"),
    path("roles/add", views.CreateRole.as_view(), name="roles-add"),
    path("roles/<int:pk>/", views.UpdateRole.as_view(), name="roles-update"),
    path(
        "organizations/manage/",
        views.ManageOrganizations.as_view(),
        name="organizations-manage",
    ),
    path("organizations/", views.Organizations.as_view(), name="organizations"),
    path(
        "organizations/add/",
        views.CreateOrganization.as_view(),
        name="organizations-add",
    ),
    path(
        "organizations/<int:pk>/",
        views.UpdateOrganization.as_view(),
        name="organizations-update",
    ),
    path(
        "organizations/<int:pk>/delete/",
        views.DeleteOrganization.as_view(),
        name="organizations-delete",
    ),
    path("owners/", views.Owners.as_view(), name="owners"),
    path("owners/add/", views.CreateOwner.as_view(), name="owners-add"),
    path("owners/<int:pk>/", views.UpdateOwner.as_view(), name="owners-update"),
]
