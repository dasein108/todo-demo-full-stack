import axios from "axios";
import { TodoItem } from "./models";

// axios.defaults.baseURL =
//   process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export function saveTodoItem(item: TodoItem): Promise<Array<TodoItem>> {
  const { completed, title, id } = item;
  if (!id) {
    return axios.post("/api/todo/", { completed, title });
  } else {
    return axios.put(`/api/todo/${id}/`, { completed, title });
  }
}

export function deleteTodoItem(id?: number) {
  return axios.delete(`/api/todo/${id}/`);
}

export function listTodoItems() {
  return axios.get(`/api/todo/`);
}
