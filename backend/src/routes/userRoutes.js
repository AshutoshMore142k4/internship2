const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, deleteAccount } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { validateProfileUpdate } = require('../middleware/validationMiddleware');

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', verifyToken, getProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', verifyToken, validateProfileUpdate, updateProfile);

/**
 * @route   DELETE /api/users/profile
 * @desc    Delete user account
 * @access  Private
 */
router.delete('/profile', verifyToken, deleteAccount);

module.exports = router;
