# Generated by Django 5.0.6 on 2024-07-07 13:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_remove_userprofile_baner_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='follow',
            old_name='user',
            new_name='follows',
        ),
        migrations.AlterUniqueTogether(
            name='follow',
            unique_together={('follows', 'follower')},
        ),
    ]