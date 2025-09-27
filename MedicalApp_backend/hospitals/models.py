from django.db import models
from doctors.models import Doctor

class Hospital(models.Model):
    name = models.CharField(max_length=150)
    location = models.CharField(max_length=255)
    contact = models.CharField(max_length=20)
    doctors = models.ManyToManyField(Doctor, through='DocHosp')

    def __str__(self):
        return self.name

class DocHosp(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.doctor.name} - {self.hospital.name}"
