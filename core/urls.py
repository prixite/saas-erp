from django.urls import path

from core.views import api

urlpatterns = [
    path(
        "users/",
        api.UserViewSet.as_view(
            {
                "get": "list",
            }
        ),
    )
]
