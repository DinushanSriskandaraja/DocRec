from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings

class DoctorProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=120)
    experience = models.CharField(max_length=100, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    availability = models.CharField(max_length=20, default='Available')
    fee = models.IntegerField(default=0)
    bio = models.TextField(blank=True)
    reviews = models.JSONField(default=list, blank=True)  # list of strings
