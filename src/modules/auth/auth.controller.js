import { registerUser, loginUser } from './auth.service.js';
import { sendSuccess, sendError } from '../../utils/response.helper.js';
import { STATUS_CODES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../utils/constants.js';

/**
 * Register new user
 * @route POST /api/auth/signup
 */
const signup = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);

    return sendSuccess(res, STATUS_CODES.CREATED, SUCCESS_MESSAGES.USER_REGISTERED, result);
  } catch (error) {
    if (error.message === 'User already exists with this email') {
      return sendError(res, STATUS_CODES.CONFLICT, error.message);
    }
    next(error);
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    return sendSuccess(res, STATUS_CODES.OK, SUCCESS_MESSAGES.LOGIN_SUCCESS, result);
  } catch (error) {
    if (error.message === 'Invalid email or password') {
      return sendError(res, STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    next(error);
  }
};

/**
 * Logout user
 * @route POST /api/auth/logout
 */
const logout = async (req, res, next) => {
  try {
    // In a stateless JWT system, logout is handled client-side
    // by removing the token from storage
    return sendSuccess(res, STATUS_CODES.OK, SUCCESS_MESSAGES.LOGOUT_SUCCESS);
  } catch (error) {
    next(error);
  }
};

export {
  signup,
  login,
  logout
};