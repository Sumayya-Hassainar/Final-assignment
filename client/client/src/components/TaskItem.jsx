import React, { useState } from "react";

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState({ title: task.title, description: task.description });

  const handleSave = () => {
    onUpdate(task._id, editTask);
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 border rounded shadow-sm ${
        task.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={editTask.description}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-3 py-1 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>

          <div className="mt-3 flex justify-between">
            <button
              onClick={() =>
                onUpdate(task._id, { completed: !task.completed })
              }
              className={`px-3 py-1 rounded ${
                task.completed ? "bg-green-600" : "bg-yellow-500"
              } text-white`}
            >
              {task.completed ? "Completed" : "Pending"}
            </button>

            <div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
