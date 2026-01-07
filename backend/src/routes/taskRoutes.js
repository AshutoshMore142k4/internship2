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

router.post('/', verifyToken, validateTask, createTask);

router.get('/', verifyToken, validatePagination, getTasks);

router.get('/stats', verifyToken, getTaskStats);

router.get('/:id', verifyToken, validateObjectId, getTaskById);

router.put('/:id', verifyToken, validateObjectId, validateTaskUpdate, updateTask);

router.delete('/:id', verifyToken, validateObjectId, deleteTask);

module.exports = router;
