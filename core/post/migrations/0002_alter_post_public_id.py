# Generated by Django 4.2 on 2023-04-14 08:42

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("core_post", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="public_id",
            field=models.UUIDField(
                db_index=True,
                default=uuid.UUID("44331d45-cef7-473c-9613-c64124dd556e"),
                editable=False,
                unique=True,
            ),
        ),
    ]
