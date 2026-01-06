const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseUtils');

/**
 * Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return successResponse(res, 200, 'Profile retrieved successfully', userData);
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    // Build update object with only provided fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (avatar !== undefined) updateData.avatar = avatar;

    // Update user
    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      isVerified: user.isVerified,
      updatedAt: user.updatedAt
    };

    return successResponse(res, 200, 'Profile updated successfully', userData);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user account
 * @route DELETE /api/users/profile
 * @access Private
 */
const deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    // Also delete all tasks associated with this user
    const Task = require('../models/Task');
    await Task.deleteMany({ userId: req.userId });

    return successResponse(res, 200, 'Account deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount
};
