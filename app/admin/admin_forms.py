from django import forms
from app import models


class OrganizationUserForm(forms.ModelForm):
    class Meta:
        model = models.User
        fields = ["email","default_role",]
        widgets={
            'email':forms.Select(choices=models.User.objects.filter(organization__isnull=True).values_list('id','username'),)
        }
        
        