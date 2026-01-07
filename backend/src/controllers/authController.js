const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');
const { successResponse, errorResponse } = require('../utils/responseUtils');

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 409, 'Email already registered');
    }

    const user = await User.create({
      email,
      password,
      name
    });

    const token = generateToken(user._id);


    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      isVerified: user.isVerified
    };

    return successResponse(res, 201, 'User registered successfully', {
      user: userData,
      token
    });

  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    const token = generateToken(user._id);


    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      isVerified: user.isVerified
    };

    return successResponse(res, 200, 'Login successful', {
      user: userData,
      token,
      expiresIn: process.env.JWT_EXPIRE || '24h'
    });

  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    return successResponse(res, 200, 'Logout successful');
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
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
      createdAt: user.createdAt
    };

    return successResponse(res, 200, 'User retrieved successfully', userData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};
