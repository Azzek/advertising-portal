# Generated by Django 5.0.6 on 2024-06-27 13:28

import django.contrib.auth.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_remove_post_category_remove_post_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='author_name',
            field=models.CharField(default='Unknown User', max_length=18, verbose_name=django.contrib.auth.models.User),
        ),
    ]