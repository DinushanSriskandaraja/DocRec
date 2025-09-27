from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/doctors/', include('doctors.urls')),
    path('api/hospitals/', include('hospitals.urls')),
    path('api/appointments/', include('appointments.urls')),
]
