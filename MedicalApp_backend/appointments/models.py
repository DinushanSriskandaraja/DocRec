from django.db import models
from users.models import User
from doctors.models import Doctor
from hospitals.models import DocHosp

class Availability(models.Model):
    SLOT_CHOICES = (('morning','Morning'),('afternoon','Afternoon'),('evening','Evening'))

    dochosp = models.ForeignKey(DocHosp, on_delete=models.CASCADE)
    available_date = models.DateField()
    time = models.TimeField()
    slot = models.CharField(max_length=20, choices=SLOT_CHOICES)
    status = models.CharField(max_length=20, default='available')  # available/booked

    def __str__(self):
        return f"{self.dochosp} - {self.available_date} {self.time}"

class Appointment(models.Model):
    STATUS_CHOICES = (('booked','Booked'),('cancelled','Cancelled'),('completed','Completed'))

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    availability = models.ForeignKey(Availability, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='booked')
    notes = models.TextField(blank=True, null=True)
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.doctor.name} - {self.availability.available_date}"
