import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { sendError } from '../utils/response.helper.js';
import { STATUS_CODES, ERROR_MESSAGES } from '../utils/constants.js';
import User from '../modules/users/user.model.js';

/**
 * Protect routes - verify JWT token
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return sendError(res, STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.TOKEN_INVALID);
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);

      // Get user from token
      const user = await User.findById(decoded.id).select('-password');

      if (!user || user.isDeleted) {
        return sendError(res, STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.USER_NOT_FOUND);
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      return sendError(res, STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.TOKEN_INVALID);
    }
  } catch (error) {
    return sendError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

export { protect };