const { StatusCodes, ReasonPhrases } = require("http-status-codes");

/**
 * Standard API response helper for SaaS applications
 */
const responseHelper = {
  /**
   * Send a success response
   * @param {Response} res - Express Response object
   * @param {number} statusCode - HTTP status code
   * @param {object} data - Response data
   * @param {string} message - Custom success message (default: 'Success')
   */
  success: (res, statusCode = StatusCodes.OK, data = {}, message = ReasonPhrases.OK) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Send an error response
   * @param {Response} res - Express Response object
   * @param {number} statusCode - HTTP status code
   * @param {string} error - Error message
   * @param {string} message - Custom error message
   */
  error: (res, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, error = "An unexpected error occurred", message = ReasonPhrases.INTERNAL_SERVER_ERROR) => {
    console.error(`[ERROR] ${message}:`, error);
    
    return res.status(statusCode).json({
      success: false,
      message,
      error,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Send a paginated response
   * @param {Response} res - Express Response object
   * @param {number} statusCode - HTTP status code
   * @param {Array} data - List of items
   * @param {string} message - Success message
   * @param {object} pagination - Pagination metadata
   */
  paginated: (res, statusCode = StatusCodes.OK, data = [], message = ReasonPhrases.OK, pagination = {}) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString(),
    });
  },
};

module.exports = responseHelper;
