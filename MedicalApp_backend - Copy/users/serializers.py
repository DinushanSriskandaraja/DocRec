from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password

# ✅ Serializer for registering a new user
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role', 'phone', 'age')
        extra_kwargs = {
            'role': {'default': 'patient'},
            'phone': {'required': False, 'allow_blank': True},
            'age': {'required': False, 'allow_null': True},
        }

    def create(self, validated_data):
        # Create user without saving password directly
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user


# ✅ Serializer for updating an existing user
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'age', 'phone')
        extra_kwargs = {
            'username': {'required': False},
            'age': {'required': False, 'allow_null': True},
            'phone': {'required': False, 'allow_blank': True},
        }
