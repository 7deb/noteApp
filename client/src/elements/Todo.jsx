import React, { useState } from 'react';

const Todo = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask('');
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md rounded-box bg-base-100 p-4 shadow-md">
      <h1 className="mb-3 text-lg font-semibold">Todo List</h1>

      {/* Input */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={task}
          className="input input-bordered w-full"
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="list">
        {tasks.length === 0 && (
          <li className="p-4 text-sm opacity-60">No tasks yet</li>
        )}

        {tasks.map((t, index) => (
          <li key={index} className="list-row items-center">
            {/* Left icon */}
            <div className="flex size-10 items-center justify-center rounded-box bg-primary/10 text-primary">
              ✓
            </div>

            {/* Task text */}
            <div className="flex-1">
              <div className="font-medium">{t}</div>
            
            </div>

            {/* Actions */}
            <button
              className="btn btn-square btn-ghost text-success"
              title="Complete"
            >
              ✔
            </button>

            <button
              onClick={() => removeTask(index)}
              className="btn btn-square btn-ghost text-error"
              title="Delete"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
