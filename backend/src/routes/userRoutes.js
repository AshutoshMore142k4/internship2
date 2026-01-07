const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, deleteAccount } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { validateProfileUpdate } = require('../middleware/validationMiddleware');

router.get('/profile', verifyToken, getProfile);

router.put('/profile', verifyToken, validateProfileUpdate, updateProfile);

router.delete('/profile', verifyToken, deleteAccount);

module.exports = router;
