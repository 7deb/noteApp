import React, { useEffect, useState } from 'react';
import { useTaskStore } from '../store/useTaskstore';

const Todo = () => {
  const [task, setTask] = useState('');

  const {
    tasks,
    fetchTasks,
    addTask,
    removeTask,
    isFetchingTasks,
    isAddingTask,
  } = useTaskStore();

  // 🔹 Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = () => {
    addTask(task);
    setTask('');
  };

  return (
    <div className="max-w-sm rounded-box bg-base-100 p-4 shadow-md">
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
        <button
          className="btn btn-primary"
          onClick={handleAddTask}
          disabled={isAddingTask}
        >
          +
        </button>
      </div>

      {/* Loading */}
      {isFetchingTasks && (
        <p className="p-4 text-sm opacity-60">Loading tasks...</p>
      )}

      {/* Task List */}
      <ul className="list">
        {!isFetchingTasks && tasks.length === 0 && (
          <li className="p-4 text-sm opacity-60">No tasks yet</li>
        )}

        {tasks.map((task) => (
          <li key={task.id} className="list-row items-center">
            {/* Icon */}
            <div className="flex size-10 items-center justify-center rounded-box bg-primary/10 text-primary">
              ✓
            </div>

            {/* Text */}
            <div className="flex-1">
              <div
                className={`font-medium ${
                  task.completed ? 'line-through opacity-50' : ''
                }`}
              >
                {task.title}
              </div>
            </div>


            <button className="btn btn-square btn-ghost text-success">
              ✔
            </button>

            <button
              onClick={() => removeTask(task.id)}
              className="btn btn-square btn-ghost text-error"
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