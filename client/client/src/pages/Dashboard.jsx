import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import TaskItem from "../components/TaskItem";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // ✅ Fetch tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data || []); // Ensure it's always an array
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again later.");
    }
  };

  // ✅ Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return alert("Please enter a task title");

    try {
      await createTask(newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks(); // Refresh list
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Could not add task.");
    }
  };

  // ✅ Update existing task
  const handleUpdateTask = async (id, updatedData) => {
    try {
      await updateTask(id, updatedData);
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Could not update task.");
    }
  };

  // ✅ Delete task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Could not delete task.");
    }
  };

  // ✅ Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  if (error) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl text-red-600 font-bold">{error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">My Task Dashboard</h1>

      {/* ✅ Add Task Form */}
      <form onSubmit={handleAddTask} className="max-w-md mx-auto mb-8 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Task title"
          className="w-full p-2 border rounded mb-2"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task description"
          className="w-full p-2 border rounded mb-2"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Add Task
        </button>
      </form>

      {/* ✅ Task List */}
      <div className="grid gap-4 max-w-3xl mx-auto">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center">No tasks available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
