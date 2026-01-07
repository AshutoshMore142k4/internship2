const express = require('express');
const router = express.Router();
const { register, login, logout, getCurrentUser } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimitMiddleware');

router.post('/register', authLimiter, validateRegister, register);

router.post('/login', authLimiter, validateLogin, login);

router.post('/logout', verifyToken, logout);

router.get('/me', verifyToken, getCurrentUser);

module.exports = router;
