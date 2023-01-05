from rest_framework import viewsets
from .serializers import TodoItemSerializer
from .models import TodoItem


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoItemSerializer
    queryset = TodoItem.objects.list()

