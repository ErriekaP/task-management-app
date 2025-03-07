from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True, "required": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class TaskSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Task
        fields = "__all__"
        extra_kwargs = {
            "author": {"read_only": True}
        }