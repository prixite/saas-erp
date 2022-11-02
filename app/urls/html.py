from django.urls import path

from app.views import html as views

app_name = "html"

urlpatterns = [
    path("", views.Home.as_view(), name="home"),
    path("users/", views.Users.as_view(), name="users"),
    path("users/add/", views.CreateUser.as_view(), name="users-add"),
    path("users/<int:pk>/", views.UpdateUser.as_view(), name="users-update"),
    path("users/<int:pk>/delete/", views.DeleteUser.as_view(), name="users-delete"),
    path("users/invite/<str:slug>/", views.InviteUser.as_view(), name="users-invite"),
    path("users/<int:pk>/modules/", views.UserModules.as_view(), name="user-modules"),
    path(
        "users/<int:pk>/modules/add/",
        views.CreateUserModule.as_view(),
        name="user-modules-add",
    ),
    path(
        "users/modules/<int:pk>/",
        views.UpdateUserModule.as_view(),
        name="user-modules-update",
    ),
    path(
        "users/modules/<int:pk>/delete/",
        views.DeleteUserModule.as_view(),
        name="user-modules-delete",
    ),
    path("employees/", views.Employees.as_view(), name="employees"),
    path("employees/add/", views.CreateEmployee.as_view(), name="employees-add"),
    path("employees/upload/", views.UploadEmployees.as_view(), name="employees-upload"),
    path(
        "employees/<int:pk>/", views.UpdateEmployee.as_view(), name="employees-update"
    ),
    path(
        "employees/<int:pk>/delete/",
        views.DeleteEmployee.as_view(),
        name="employees-delete",
    ),
    path("payroll/", views.Payroll.as_view(), name="payroll"),
    path("inventory/", views.Inventory.as_view(), name="inventory"),
    path("settings/", views.Settings.as_view(), name="settings"),
    path("account/<int:pk>/", views.Account.as_view(), name="account"),
    path("profile/<int:pk>/", views.Profile.as_view(), name="profile"),
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
    path("modules/", views.Modules.as_view(), name="modules"),
    path(
        "modules/add/",
        views.CreateModule.as_view(),
        name="modules-add",
    ),
    path(
        "modules/<int:pk>/",
        views.UpdateModule.as_view(),
        name="modules-update",
    ),
    path(
        "modules/<int:pk>/delete/",
        views.DeleteModule.as_view(),
        name="modules-delete",
    ),
    path(
        "organizations/modules/",
        views.OrganizationModules.as_view(),
        name="organizations-modules",
    ),
    path(
        "organizations/modules/add/",
        views.CreateOrganizationModule.as_view(),
        name="organizations-modules-add",
    ),
    path(
        "organizations/modules/<int:pk>/",
        views.UpdateOrganizationModule.as_view(),
        name="organizations-modules-update",
    ),
    path(
        "organizations/modules/<int:pk>/delete/",
        views.DeleteOrganizationModule.as_view(),
        name="organizations-modules-delete",
    ),
    path("owners/", views.Owners.as_view(), name="owners"),
    path("owners/add/", views.CreateOwner.as_view(), name="owners-add"),
    path("owners/<int:pk>/", views.UpdateOwner.as_view(), name="owners-update"),
    path("owners/<int:pk>/delete/", views.DeleteOwner.as_view(), name="owners-delete"),
    path("logout/", views.Logout.as_view(), name="logout"),
]
