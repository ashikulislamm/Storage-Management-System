import { getUserProfile, updateUserProfile, deleteUserAccount } from './user.service.js';
import { sendSuccess, sendError } from '../../utils/response.helper.js';
import { STATUS_CODES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../utils/constants.js';

/**
 * Get user profile
 * @route GET /api/users/profile
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await getUserProfile(req.user._id);

    if (!user) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return sendSuccess(res, STATUS_CODES.OK, 'Profile retrieved successfully', { user });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * @route PUT /api/users/profile
 */
const updateProfile = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await updateUserProfile(req.user._id, { username });

    return sendSuccess(res, STATUS_CODES.OK, SUCCESS_MESSAGES.PROFILE_UPDATED, { user });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user account
 * @route DELETE /api/users/profile
 */
const deleteAccount = async (req, res, next) => {
  try {
    await deleteUserAccount(req.user._id);

    return sendSuccess(res, STATUS_CODES.OK, SUCCESS_MESSAGES.USER_DELETED);
  } catch (error) {
    next(error);
  }
};

export {
  getProfile,
  updateProfile,
  deleteAccount
};