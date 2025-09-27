from django.contrib.auth.models import AbstractUser
from django.db import models

# Define choices for gender
GENDER_CHOICES = [
    ('male', 'Male'),
    ('female', 'Female'),
    ('other', 'Other'),
]

class User(AbstractUser):
    # Remove "name" because AbstractUser already has first_name + last_name
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)

    # REQUIRED_FIELDS tells Django which fields are required when creating superusers
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username  # or return self.email if you prefer
