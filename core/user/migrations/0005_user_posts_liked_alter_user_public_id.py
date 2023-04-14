# Generated by Django 4.2 on 2023-04-14 08:42

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("core_post", "0002_alter_post_public_id"),
        ("core_user", "0004_alter_user_created_alter_user_public_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="posts_liked",
            field=models.ManyToManyField(related_name="liked_by", to="core_post.post"),
        ),
        migrations.AlterField(
            model_name="user",
            name="public_id",
            field=models.UUIDField(
                db_index=True,
                default=uuid.UUID("44331d45-cef7-473c-9613-c64124dd556e"),
                editable=False,
                unique=True,
            ),
        ),
    ]