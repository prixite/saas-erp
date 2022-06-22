from core import views
from django.urls import path

urlpatterns =[
    path('users/',views.UserViewSet.as_view({
        'get':'list',
    }))
]