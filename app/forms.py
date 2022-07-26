from django.forms.models import BaseInlineFormSet
from app import models
from django import forms

class UserInlineFormset(BaseInlineFormSet):
    def get_queryset(self):
        return models.User.objects.all()
    
class UserForm(forms.BaseModelForm):
    class Meta:
        model = models.User
        fields = ('email','default_role')