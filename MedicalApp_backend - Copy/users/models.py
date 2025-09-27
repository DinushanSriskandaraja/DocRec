from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (('patient','Patient'), ('doctor','Doctor'), ('admin','Admin'))
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='patient')
    phone = models.CharField(max_length=30, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
