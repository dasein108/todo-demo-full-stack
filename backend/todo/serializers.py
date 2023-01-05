from rest_framework import serializers
from .models import TodoItem


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ('id', 'title', 'created_at', 'completed_at', 'completed')
        read_only_fields = ('created_at', 'completed_at')
