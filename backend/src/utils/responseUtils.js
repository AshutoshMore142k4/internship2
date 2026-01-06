/**
 * Utility functions for standardized API responses
 */

/**
 * Success response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {object} data - Response data
 */
const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Error response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {array} errors - Array of error details
 */
const errorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message
  };

  if (errors !== null) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Pagination metadata
 * @param {number} currentPage - Current page number
 * @param {number} limit - Items per page
 * @param {number} totalItems - Total number of items
 * @returns {object} Pagination metadata
 */
const getPaginationMetadata = (currentPage, limit, totalItems) => {
  const totalPages = Math.ceil(totalItems / limit);
  
  return {
    currentPage,
    totalPages,
    totalItems,
    limit,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};

module.exports = {
  successResponse,
  errorResponse,
  getPaginationMetadata
};
