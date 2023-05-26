from django.db import models

from core.abstract import AbstractManager, AbstractModel


class InterestManager(AbstractManager):
    pass


class Interest(models.Model):
    INTEREST_CHOICES = [
        ("none", "None"),
        ("Sport", (
                ("running", "Running"),
                ("jumping", "Jumping"),
                ("cycling", "Cycling")
            )
        ),
        ("Programming", (
                ("python", "Python"),
                ("javascript", "JavaScript"),
                ("java", "Java"),
                ("react", "React")
            )
        ),
        ("Else", (
                ("cooking", "Cooking"),
                ("building", "Building"),
                ("driving", "Driving"),
                ("traveling", "Traveling")
            )
        ),
    ]
    author = models.ForeignKey(to="core_user.User", on_delete=models.CASCADE)
    interest = models.CharField(
        max_length=100, choices=INTEREST_CHOICES, default="none"
    )

    objects = InterestManager()

    def __str__(self):
        return self.author.name
