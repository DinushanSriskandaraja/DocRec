from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Appointment
from .serializers import AppointmentSerializer
from django.core import signing

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_appointment(request):
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({"success":"true", "appointmentId": serializer.data['id'], "message":"Appointment booked successfully"})
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_appointments(request, user_id):
    appointments = Appointment.objects.filter(user_id=user_id)
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def cancel_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.delete()
        return Response({"success":"true","message":"Appointment cancelled"})
    except Appointment.DoesNotExist:
        return Response({"success":"false","message":"Not found"}, status=404)

@api_view(['GET'])
def share_appointment(request, appointment_id):
    signer = signing.TimestampSigner()
    token = signer.sign(str(appointment_id))
    share_link = f"https://yourfrontend.com/share/{token}"
    return Response({"appointmentId": appointment_id,"shareLink": share_link})
