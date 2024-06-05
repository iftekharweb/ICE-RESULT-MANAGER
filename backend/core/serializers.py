from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        max_length=255,
        style = {'input_type':'password'},
        write_only=True
    )

    class Meta:
        model = User
        fields = ['email', 'name', 'role', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')
        if password == password2:
            return data
        raise serializers.ValidationError("Password and confirm password did not match!")
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class UseLogInSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    class Meta: 
        model = User
        fields = ['email', 'password']