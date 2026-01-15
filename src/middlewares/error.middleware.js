import logger from '../utils/logger.js';
import { sendError } from '../utils/response.helper.js';
import { STATUS_CODES } from '../utils/constants.js';

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return sendError(res, STATUS_CODES.BAD_REQUEST, 'Validation Error', errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return sendError(res, STATUS_CODES.CONFLICT, `${field} already exists`);
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    return sendError(res, STATUS_CODES.BAD_REQUEST, 'Invalid ID format');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, STATUS_CODES.UNAUTHORIZED, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, STATUS_CODES.UNAUTHORIZED, 'Token expired');
  }

  // Multer errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return sendError(res, STATUS_CODES.BAD_REQUEST, 'File size is too large');
    }
    return sendError(res, STATUS_CODES.BAD_REQUEST, err.message);
  }

  // Default error
  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  return sendError(res, statusCode, message);
};
export { errorHandler };