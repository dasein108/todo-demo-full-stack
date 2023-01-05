from django.contrib import admin

from django.contrib import admin
from .models import TodoItem  # add this


class TodoItemAdmin(admin.ModelAdmin):
    list_display = ('title',  'completed', 'created_at', 'completed_at')


# Register your models here.
admin.site.register(TodoItem, TodoItemAdmin)
