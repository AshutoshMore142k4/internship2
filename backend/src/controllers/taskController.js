const Task = require('../models/Task');
const { successResponse, errorResponse, getPaginationMetadata } = require('../utils/responseUtils');

/**
 * Create a new task
 * @route POST /api/tasks
 * @access Private
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Create task
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.userId
    });

    const taskData = {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    };

    return successResponse(res, 201, 'Task created successfully', taskData);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all tasks for authenticated user with pagination and filters
 * @route GET /api/tasks
 * @access Private
 */
const getTasks = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      search,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build query
    const query = { userId: req.userId };

    // Add filters
    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build sort object
    const sort = {};
    sort[sortBy] = order === 'asc' ? 1 : -1;

    // Execute query
    const [tasks, totalTasks] = await Promise.all([
      Task.find(query)
        .sort(sort)
        .limit(limitNum)
        .skip(skip)
        .lean(),
      Task.countDocuments(query)
    ]);

    // Format tasks
    const formattedTasks = tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }));

    // Get pagination metadata
    const pagination = getPaginationMetadata(pageNum, limitNum, totalTasks);

    return successResponse(res, 200, 'Tasks retrieved successfully', {
      tasks: formattedTasks,
      pagination
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single task by ID
 * @route GET /api/tasks/:id
 * @access Private
 */
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return errorResponse(res, 404, 'Task not found');
    }

    const taskData = {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    };

    return successResponse(res, 200, 'Task retrieved successfully', taskData);
  } catch (error) {
    next(error);
  }
};

/**
 * Update task
 * @route PUT /api/tasks/:id
 * @access Private
 */
const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Build update object with only provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate;

    // Find task and verify ownership
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return errorResponse(res, 404, 'Task not found or unauthorized');
    }

    const taskData = {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      updatedAt: task.updatedAt
    };

    return successResponse(res, 200, 'Task updated successfully', taskData);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete task
 * @route DELETE /api/tasks/:id
 * @access Private
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return errorResponse(res, 404, 'Task not found or unauthorized');
    }

    return successResponse(res, 200, 'Task deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get task statistics
 * @route GET /api/tasks/stats
 * @access Private
 */
const getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
          },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          high: {
            $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] }
          },
          medium: {
            $sum: { $cond: [{ $eq: ['$priority', 'medium'] }, 1, 0] }
          },
          low: {
            $sum: { $cond: [{ $eq: ['$priority', 'low'] }, 1, 0] }
          }
        }
      }
    ]);

    const statsData = stats.length > 0 ? stats[0] : {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      high: 0,
      medium: 0,
      low: 0
    };

    // Remove _id field
    delete statsData._id;

    return successResponse(res, 200, 'Statistics retrieved successfully', statsData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
};
