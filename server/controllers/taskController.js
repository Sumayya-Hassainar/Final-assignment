const Task = require('../models/Task');

/**
 * Get all tasks for the logged-in user
 */
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
};

/**
 * Create a new task
 */
exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, dueDate, priority } = req.body;
    if (!title) return res.status(400).json({ message: 'Task title is required' });

    const task = new Task({
      userId,
      title,
      description: description || '',
      dueDate: dueDate || null,
      priority: priority || 'medium'
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Server error creating task' });
  }
};

/**
 * Update a task by id
 */
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findOne({ _id: id, userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    Object.assign(task, updates);
    await task.save();
    res.json(task);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Server error updating task' });
  }
};

/**
 * Delete a task by id
 */
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId });
    if (!task) return res.status(404).json({ message: 'Task not found or already deleted' });

    res.json({ message: 'Task deleted', taskId: id });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ message: 'Server error deleting task' });
  }
};
