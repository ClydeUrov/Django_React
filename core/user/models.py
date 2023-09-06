from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser, BaseUserManager
from django.db import models

from core.abstract import AbstractManager, AbstractModel


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.public_id, filename)


class UserManager(BaseUserManager, AbstractManager):
    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, phone number, username and password."""
        if username is None:
            raise TypeError('Users must have a username')
        if email is None:
            raise TypeError('Users must have an email')
        if password is None:
            raise TypeError('User must have a password')

        user = self.model(username=username, email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password, **kwargs):
        """Create and return a `User` with superuser (admin) permissions."""
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')
        if username is None:
            raise TypeError('Superusers must have an username.')

        user = self.create_user(username, email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class Interest(models.Model):
    name = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.name


class User(AbstractModel, AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    posts_liked = models.ManyToManyField("core_post.Post", related_name="liked_by")
    comments_liked = models.ManyToManyField("core_comment.Comment", related_name="commented_by")
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to=user_directory_path, blank=True, null=True)
    interests = models.ManyToManyField(Interest)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # USERNAME_FIELD = 'username'
    # EMAIL_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_superuser

    def add_interest(self, interest):
        """
        Добавить интерес пользователю.
        :param interest: объект интереса, который нужно добавить
        """
        self.interests.add(interest)

    def remove_interest(self, interest):
        """
        Удалить интерес у пользователя.
        :param interest: объект интереса, который нужно удалить
        """
        self.interests.remove(interest)

    def like(self, post):
        """Like `post` if it hasn't been done yet"""
        return self.posts_liked.add(post)

    def remove_like(self, post):
        """Remove a like from a `post`"""
        return self.posts_liked.remove(post)

    def has_like(self, post):
        """Return True if the user has liked a `post`; else False"""
        return self.posts_liked.filter(pk=post.pk).exists()

    def like_comment(self, comment):
        """Like `comment` if it hasn't been done yet"""
        return self.comments_liked.add(comment)

    def remove_like_comment(self, comment):
        """Remove a like from a `comment`"""
        return self.comments_liked.remove(comment)

    def has_liked_comment(self, comment):
        """Return True if the user has liked a `comment`; else False"""
        return self.comments_liked.filter(pk=comment.pk).exists()

