from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import RegisterView, UserUpdateView, test_api

urlpatterns = [
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('users/<int:id>/', UserUpdateView.as_view(), name='user_update'),
    path('test/', test_api, name='test_api'),
]
