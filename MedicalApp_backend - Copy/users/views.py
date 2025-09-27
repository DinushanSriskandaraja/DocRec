from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User
from .serializers import RegisterSerializer, UserUpdateSerializer
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView

# ✅ Register new user
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # <-- Add this line



# ✅ Update existing user
class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# ✅ Test endpoint to check if users API is working
def test_api(request):
    return JsonResponse({"message": "Users API is working ✅"})
