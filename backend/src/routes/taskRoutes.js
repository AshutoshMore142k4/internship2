const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');
const {
  validateTask,
  validateTaskUpdate,
  validateObjectId,
  validatePagination
} = require('../middleware/validationMiddleware');

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private
 */
router.post('/', verifyToken, validateTask, createTask);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks with pagination and filters
 * @access  Private
 */
router.get('/', verifyToken, validatePagination, getTasks);

/**
 * @route   GET /api/tasks/stats
 * @desc    Get task statistics
 * @access  Private
 */
router.get('/stats', verifyToken, getTaskStats);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get single task by ID
 * @access  Private
 */
router.get('/:id', verifyToken, validateObjectId, getTaskById);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task
 * @access  Private
 */
router.put('/:id', verifyToken, validateObjectId, validateTaskUpdate, updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete task
 * @access  Private
 */
router.delete('/:id', verifyToken, validateObjectId, deleteTask);

module.exports = router;
