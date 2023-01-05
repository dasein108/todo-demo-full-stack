import { render, screen, fireEvent } from "@testing-library/react";

import { TodoItem } from "../../../models";
import TodoListItem from ".";

const newItem: TodoItem = { title: "U test", completed: false };
const existingItem: TodoItem = { id: 111, title: "U test", completed: false };

const stubParams = { onSave: () => {}, onDelete: () => {} };

it("render new todo in edit mode", () => {
  render(<TodoListItem item={newItem} {...stubParams} />);
  expect(screen.getByTitle("Save")).toBeInTheDocument();
});

it("render existent todo in view mode", () => {
  render(<TodoListItem item={existingItem} {...stubParams} />);
  expect(screen.getByTitle("Edit")).toBeInTheDocument();
});

describe("Todo Item edit mode", () => {
  const todoListItem = <TodoListItem item={existingItem} {...stubParams} />;
  it("should switch to edit mode", () => {
    render(todoListItem);
    fireEvent.click(screen.getByTitle("Edit"));

    expect(screen.getByTitle("Save")).toBeInTheDocument();
  });

  it("should hide save button", () => {
    render(todoListItem);

    fireEvent.click(screen.getByTitle("Edit"));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });
    expect(screen.queryByTitle("Save")).toBeNull();
  });
});
