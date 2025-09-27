from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    experience_years = models.PositiveIntegerField()
    profile_pic = models.ImageField(upload_to='doctor_profiles/', null=True, blank=True)

    def __str__(self):
        return self.name
