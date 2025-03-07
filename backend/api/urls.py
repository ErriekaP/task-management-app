from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.TaskListCreateView.as_view(), name='task-list'),
    path('tasks/delete/<int:pk>/', views.TaskDelete.as_view(), name='task-delete'),
    path('tasks/update/<int:pk>/', views.TaskUpdate.as_view(), name='task-update'),
    path('tasks/<int:pk>/', views.TaskDetailView.as_view(), name='task-detail'),
]