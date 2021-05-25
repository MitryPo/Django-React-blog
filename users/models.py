from django.db import models
from uuid import uuid4
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomAccountManager(BaseUserManager):

    def create_user(self, email, password, **kwargs):
        if email is None:
            raise TypeError('Users must provide email adress.')

        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.is_active = True
        user.save()

        return user

    def create_superuser(self, email, password, **kwargs):
        if password is None:
            raise TypeError('Users must have a password.')

        user = self.create_user(email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), max_length=150, unique=True)
    user_name = models.CharField(max_length=150)
    avatar = models.ImageField(upload_to='account', null=True, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'

    def save(self, *args, **kwargs):
        id = uuid4()
        if not self.id:
            self.user_name = (str(id.time_low))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user_name
