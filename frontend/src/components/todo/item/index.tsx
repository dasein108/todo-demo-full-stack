import React, { useState, useEffect } from "react";
import { TodoItem } from "../../../models";
import { List, Input, Checkbox } from "antd";
import {
  DeleteFilled,
  EditFilled,
  CheckOutlined,
  SaveFilled,
} from "@ant-design/icons";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import "./styles.css";

interface ITodoItem {
  item: TodoItem;
  onSave: (item: TodoItem) => void;
  onDelete: (item: TodoItem) => void;
}

function TodoListItem({ item, onSave, onDelete }: ITodoItem) {
  const [currentItem, setCurrentItem] = useState<TodoItem>(item);
  const [editMode, setEditMode] = useState<boolean>(!currentItem.id);

  useEffect(() => setCurrentItem(item), [item]);

  const onChangeComplete = (e: CheckboxChangeEvent) =>
    setCurrentItem((item) => ({ ...item, completed: e.target.checked }));

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentItem((item) => ({ ...item, title: e.target.value }));

  const save = () => {
    onSave(currentItem);
    setEditMode(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      save();
    }
  };

  const renderEditButton = () =>
    editMode ? (
      currentItem.title.trim().length > 0 && (
        <SaveFilled title="Save" onClick={() => save()} />
      )
    ) : (
      <EditFilled title="Edit" onClick={() => setEditMode(true)} />
    );

  return (
    <List.Item
      actions={[
        renderEditButton(),
        <DeleteFilled title="Delete" onClick={() => onDelete(item)} />,
      ]}
    >
      {!editMode && (
        <div className="todo-item-content">
          <div className="completed">
            {currentItem.completed && <CheckOutlined />}
          </div>
          <div>{item.title}</div>
        </div>
      )}
      {editMode && (
        <div className="todo-item-content" onKeyUp={handleKeyPress}>
          <div className="completed">
            <Checkbox
              onChange={onChangeComplete}
              checked={currentItem.completed}
            />
          </div>
          <div className="editable">
            <Input
              value={currentItem.title}
              placeholder="Enter your awesome todo..."
              onChange={onChangeTitle}
            />
          </div>
        </div>
      )}
    </List.Item>
  );
}

export default TodoListItem;
