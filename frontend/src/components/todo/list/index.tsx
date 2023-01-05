import React, { useState, useEffect } from "react";
import { listTodoItems, saveTodoItem, deleteTodoItem } from "../../../services";
import { TodoItem } from "../../../models";
import { Button, Space, List, Alert } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import TodoListItem from "../item";

import "./styles.css";

enum ResultType {
  Saved = 1,
  Deleted,
}

function TodoList() {
  const [todoItems, setTodoItems] = useState<Array<TodoItem>>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<ResultType>();

  const loadTodoList = () => {
    setLoading(true);
    listTodoItems()
      .then(({ data }) => setTodoItems(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => loadTodoList(), []);

  useEffect(() => {
    setTimeout(() => {
      setAlert(undefined);
    }, 3000);
  }, [alert]);

  const saveItem = (item: TodoItem) => {
    setLoading(true);
    saveTodoItem(item)
      .then(() => setAlert(ResultType.Saved))
      .finally(() => loadTodoList());
  };

  const deleteItem = (item: TodoItem) => {
    setLoading(true);
    if (item.id) {
      deleteTodoItem(item.id)
        .then(() => setAlert(ResultType.Deleted))
        .finally(() => loadTodoList());
    } else {
      loadTodoList();
    }
  };

  const newTodoItem = () => {
    setTodoItems((items) => [...items, new TodoItem()]);
  };

  const renderAlert = () => {
    const message =
      alert === ResultType.Deleted
        ? "Todo Item was deleted"
        : "Todo Items was saved";
    return <Alert message={message} type="success" showIcon />;
  };

  const renderListActions = () => (
    <Space className="actions-panel">
      <Button
        icon={<PlusCircleOutlined />}
        type="primary"
        size="large"
        onClick={newTodoItem}
      >
        Add Todo
      </Button>
      {alert && renderAlert()}
    </Space>
  );

  return (
    <div className="todo-list">
      {renderListActions()}
      <List
        loading={loading}
        itemLayout="horizontal"
        size="large"
        dataSource={todoItems}
        renderItem={(item) => (
          <TodoListItem item={item} onSave={saveItem} onDelete={deleteItem} />
        )}
      />
    </div>
  );
}

export default TodoList;
