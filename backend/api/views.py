from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from .models import Task, UserRole

import logging

logger = logging.getLogger(__name__)


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_permissions(self):
            if self.request.method == 'GET':
                return [AllowAny()]
            else:
                return [IsAuthenticated()]

    def get_queryset(self):
            return Task.objects.all()

    
    def perform_create(self, serializer):
        user_role = UserRole.objects.filter(user_id=self.request.user.id).first()

        # if user_role and user_role.role == 'admin':
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
        # else:
        #     raise PermissionDenied("You do not have the required role to create a task.")

            
class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        user_role = UserRole.objects.filter(user_id=user.id).first()

        if user_role and user_role.role == 'admin':
            return Task.objects.all()
        
        return Task.objects.filter(author=user) 

    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return User.objects.all()
    
    def create(self, request, *args, **kwargs):
        role = request.data.get('role', 'user') 
        response = super().create(request, *args, **kwargs)

        # logger.debug(f"Response data: {response.data}")

        user_id = response.data.get('id')  
        user_name = response.data.get('username')  

        if user_id and user_name:
            # logger.debug(f"Creating UserRole for user_id: {user_id}, user_name: {user_name}")
            
            UserRole.objects.create(user_id=user_id, user=user_name, role=role)
            # logger.debug(f"UserRole created for user_id: {user_id}")

        # else:
        #     logger.error(f"Failed to create UserRole, missing user_id or user_name")

        return response
    
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TaskUpdate(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        user_role = UserRole.objects.filter(user_id=user.id).first()

        if user_role and user_role.role == 'admin':
            return Task.objects.all()
        
        return Task.objects.filter(author=user)

    def perform_update(self, serializer):
        user_role = UserRole.objects.filter(user_id=self.request.user.id).first()

        if not user_role or user_role.role != 'admin':
            if serializer.instance.author != self.request.user:
                raise PermissionDenied("You do not have the required role to update this task.")
        
        if serializer.is_valid():
            serializer.save()
            print("Task updated successfully.")
        else:
            print(serializer.errors)


class TaskDetailView(generics.RetrieveAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.all()