from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import DoctorProfile
from .serializers import DoctorProfileSerializer

class DoctorListView(generics.ListAPIView):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer

class DoctorDetailView(generics.RetrieveAPIView):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer
    lookup_field = 'id'
