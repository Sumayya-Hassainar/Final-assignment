import React, { useState } from "react";
import { createTask } from "../api";

const TaskForm = ({ fetchTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(formData);
      setFormData({ title: "", description: "", dueDate: "", priority: "medium" });
      fetchTasks(); // ✅ Refresh task list in Dashboard
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-8"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h2>

      <div className="grid gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task Description"
          rows="3"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <div className="flex gap-4">
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
