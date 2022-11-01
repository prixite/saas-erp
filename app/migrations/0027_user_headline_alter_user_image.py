# Generated by Django 4.1.2 on 2022-11-01 05:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0026_remove_employee_image_user_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='headline',
            field=models.CharField(default='', max_length=255, verbose_name='headline'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(default='../static/app/assets/profile_default.png', null=True, upload_to='profile'),
        ),
    ]
