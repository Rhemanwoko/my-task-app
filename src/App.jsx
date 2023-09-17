import { useReducer, useState } from "react";
import taskReducer from "./taskReducer";
import "./App.css";
import "./index.css";
import "tailwindcss/tailwind.css";

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      name: newTaskName,
      dueDate: newTaskDueDate,
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
    setNewTaskName("");
    setNewTaskDueDate("");
  };

  const deleteTask = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-white bg-zinc-900 text-center py-2 mt-2">
        My Task Handler
      </h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Task Name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="w-full md:w-4/6 p-2 mb-2 md:mr-2 lg:mr-6 border border-gray-400"
        />
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          className="w-full md:w-1/5 mb-2 p-2 border border-gray-400 md:mr-2 lg:mr-6"
        />
        <button
          onClick={addTask}
          className="text-white p-2 bg-lime-600 hover:bg-lime-900"
        >
          Add Task
        </button>
      </div>
      {tasks.length === 0 ? (
        <div className="bg-gray-200 flex justify-center py-2">
          No tasks available.
        </div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="mb-3 bg-gray-200 flex justify-between rounded py-2 md:px-2 px-1"
            >
              <div className="">
                <p className="break-words">
                  <input type="checkbox" /> {task.name}{" "}
                </p>
                <p className="text-sm">Due: {task.dueDate}</p>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white p-1 rounded text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
