const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// All routes are protected
router.use(auth);

// GET /api/tasks - list user's tasks
router.get('/', getTasks);

// POST /api/tasks - create task
router.post('/', createTask);

// PUT /api/tasks/:id - update task
router.put('/:id', updateTask);

// DELETE /api/tasks/:id - delete task
router.delete('/:id', deleteTask);

module.exports = router;
