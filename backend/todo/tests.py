import pytz
from django.test import TestCase
from todo.models import TodoItem
from todo.utils import now_
from datetime import datetime, timezone
from unittest import mock


class TodoItemModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        TodoItem.objects.create(title='test_incomplete_item')
        TodoItem.objects.create(title='test_completed_item', completed=True)

    def test_should_be_complete(self):
        todo = TodoItem.objects.get(id=1)
        todo.completed = True
        todo.save()
        assert type(todo.completed_at) is datetime

    def test_should_not_be_complete(self):
        todo = TodoItem.objects.get(id=1)
        todo.completed = False
        todo.save()

        assert todo.completed_at is None

    def test_should_filter_past_completed(self):

        # Create item in past
        with mock.patch('todo.models.now_') as mock_dt:
            mock_dt.return_value = datetime(2012, 1, 1, tzinfo=pytz.UTC)
            TodoItem.objects.create(title='test_old_record', completed=True)
            assert len(TodoItem.objects.list()) == 3

        assert len(TodoItem.objects.list()) == 2
