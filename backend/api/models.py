from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="task")
    author_name = models.CharField(max_length=100, default="")
    
class UserRole(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    user = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    

    def __str__(self):
        return self.title
    