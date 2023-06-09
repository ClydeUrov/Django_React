# Generated by Django 4.2 on 2023-04-26 18:16

import core.user.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core_user", "0007_user_comments_liked_alter_user_public_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="avatar",
            field=models.ImageField(
                blank=True, null=True, upload_to=core.user.models.user_directory_path
            ),
        ),
    ]
