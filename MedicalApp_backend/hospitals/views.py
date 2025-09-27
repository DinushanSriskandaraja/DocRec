from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Hospital, DocHosp
from .serializers import HospitalSerializer, DocHospSerializer

class HospitalViewSet(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer

class DocHospViewSet(viewsets.ModelViewSet):
    queryset = DocHosp.objects.all()
    serializer_class = DocHospSerializer
