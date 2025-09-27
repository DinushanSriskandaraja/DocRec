from django.urls import path
from .views import book_appointment, list_appointments, cancel_appointment, share_appointment

urlpatterns = [
    path('appointments', book_appointment),
    path('appointments/<str:user_id>', list_appointments),
    path('appointments/<str:id>', cancel_appointment),
    path('share/<str:appointment_id>', share_appointment),
]
