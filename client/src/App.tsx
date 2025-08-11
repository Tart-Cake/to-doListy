import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./components/Task";
import type { Task } from "./types/Task";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Get Tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadTasks();
  }, []);

  // Add new task
  const handleAddTask = async (task: { text: string; completed: boolean }) => {
    try {
      const newTask = await createTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update task
  const handleUpdateTask = async (id: string, newText: string) => {
    try {
      await updateTask(id, newText);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: newText } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black'>
      {/* Centered container */}
      <div className='flex flex-col items-center justify-center min-h-screen max-w-2xl mx-auto p-4'>
        <Header />
        <AddTask addTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          deleteTask={handleDeleteTask}
          updateTask={handleUpdateTask}
        />
        <Footer />
      </div>
    </div>
  );
};

export default App;
