from rest_framework import serializers
from .models import Hospital, DocHosp
from doctors.serializers import DoctorSerializer

class DocHospSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocHosp
        fields = "__all__"

class HospitalSerializer(serializers.ModelSerializer):
    doctors = DoctorSerializer(many=True, read_only=True)

    class Meta:
        model = Hospital
        fields = "__all__"
