from django.db import models
from datetime import timedelta
from django.db.models import Q

from todo.utils import now_

TODO_ITEM_LIFE_TIME_DAYS = 30


class TodoManager(models.Manager):
    def list(self):
        actual_date = now_() - timedelta(days=TODO_ITEM_LIFE_TIME_DAYS)
        return self.filter(Q(completed_at__gte=actual_date) | Q(completed_at__isnull=True))


class TodoItem(models.Model):
    title = models.CharField(max_length=120)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    # TODO: ATTACH TO SPECIFIC USER
    # user = models.ForeignKey(User, on_delete=models.CASCADE)

    objects = TodoManager()

    def _str_(self):
        return f'{self.title}{self.completed}'

    def save(self, *args, **kwargs):
        self.completed_at = now_() if self.completed else None
        super(TodoItem, self).save(*args, **kwargs)


