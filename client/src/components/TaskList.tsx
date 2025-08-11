import { useState } from "react";
import type { Task } from "../types/Task";
import { FaPen, FaCheck, FaPenSquare } from "react-icons/fa";

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  updateTask: (id: string, newText: string) => void;
}

const TaskList = ({ tasks, deleteTask, updateTask }: TaskListProps) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskText, setEditingTaskText] = useState<string>("");

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
  };
  const saveEdit = () => {
    if (editingTaskId !== null && editingTaskText !== "") {
      updateTask(editingTaskId, editingTaskText);
      setEditingTaskId(null);
      setEditingTaskText("");
    } else {
      alert("You can't add empty task !!!");
    }
  };

  return (
    <section className='w-full mb-6 p-6 bg-gray-800'>
      <h2 className='text-2xl text-white mb-6 text-center'>Task List</h2>
      {/* Task items */}
      <ul className='space-y-2'>
        {tasks.map((task) => (
          <div className='flex justify-between items-center'>
            <li
              className='flex-1 px-4 py-2 border w-full mr-2 bg-gray-900 text-white 
                     border border-gray-700 focus:outline-none focus:border-blue-500
                     transition-colors duration-300 hover:bg-blue-400'
              key={task.id}
            >
              {editingTaskId === task.id ? (
                <input
                  type='text'
                  value={editingTaskText}
                  onChange={(e) => setEditingTaskText(e.target.value)}
                  className='flex-1 bg-gray-800 text-white w-full border border-gray-700'
                />
              ) : (
                <span>{task.text}</span>
              )}
            </li>
            {editingTaskId === task.id ? (
              <button
                className='border border-gray-500 text-white mr-2 flex items-center justify-center transition-all duration-300
                    bg-yellow-400 w-10 h-10 cursor-pointer'
                onClick={() => saveEdit()}
              >
                <FaPenSquare size={32} />
              </button>
            ) : (
              <button
                className='border border-gray-500 text-white mr-2 flex items-center justify-center transition-all duration-300
                    hover:bg-yellow-400 w-10 h-10 cursor-pointer'
                onClick={() => startEditing(task)}
              >
                <FaPen />
              </button>
            )}
            <button
              className='border border-gray-500 text-white mr-2 flex items-center justify-center transition-all duration-300
                    hover:bg-green-400 w-10 h-10 cursor-pointer'
              onClick={() => {
                editingTaskId !== null
                  ? alert("Finish editing the task !!!")
                  : deleteTask(task.id);
              }}
            >
              <FaCheck />
            </button>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default TaskList;
