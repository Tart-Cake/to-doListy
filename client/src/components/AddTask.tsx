import { useState, type FormEvent } from "react";
import { FaPlus } from "react-icons/fa";

interface AddTaskProps {
  addTask: (task: { text: string; completed: boolean }) => void;
}

const AddTask = ({ addTask }: AddTaskProps) => {
  const [text, setText] = useState<string>("");

  const submitForm = (e: FormEvent) => {
    e.preventDefault(); // Stop the page from refershing each time the button is clicked.
    if (!text.trim()) return; // Prevent empty tasks

    const newTask = {
      text,
      completed: false,
    };
    addTask(newTask);
    setText("");
  };

  return (
    <section className='w-full mb-6 p-6 bg-gray-800'>
      <h2 className='text-2xl text-white mb-6 text-center'>Create Task</h2>
      {/* Task input form */}
      <form onSubmit={submitForm} className='flex gap-2 items-center'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Add a new task...'
          className='flex-1 px-4 py-2 bg-gray-900 text-white 
                     border border-gray-700 focus:outline-none focus:border-blue-500
                     transition-colors duration-300 hover:bg-blue-400'
        ></input>
        {/* Create button */}
        <button
          className='text-white border border-gray-500
                    flex items-center justify-center transition-all duration-300
                    hover:bg-pink-400 w-10 h-10 cursor-pointer'
          type='submit'
        >
          <FaPlus />
        </button>
      </form>
    </section>
  );
};

export default AddTask;
