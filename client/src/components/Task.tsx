import type { Task } from "../types/Task";

const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};

export const createTask = async (task: {
  text: string;
  completed: boolean;
}): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return response.json();
};

export const updateTask = async (id: string, text: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) throw new Error("Failed to update task");
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");
};
