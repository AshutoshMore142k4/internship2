/**
 * Global error handling middleware
 * Handles all types of errors including MongoDB, JWT, and application errors
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method
  });

  // Default error
  let error = {
    success: false,
    message: err.message || 'Internal Server Error',
    statusCode: err.statusCode || 500
  };

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    error.message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    error.statusCode = 409;
  }

  // MongoDB validation error
  if (err.name === 'ValidationError') {
    error.message = 'Validation failed';
    error.statusCode = 400;
    error.errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
  }

  // MongoDB CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    error.message = 'Invalid ID format';
    error.statusCode = 400;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.statusCode = 401;
  }

  // Build response object
  const response = {
    success: false,
    message: error.message
  };

  // Add errors array if exists (for validation errors)
  if (error.errors) {
    response.errors = error.errors;
  }

  // Add stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  // Send error response
  res.status(error.statusCode).json(response);
};

/**
 * Middleware to handle 404 errors for undefined routes
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFound
};
