# Generated by Django 5.0.6 on 2024-06-15 15:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_post_category'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Post',
        ),
    ]