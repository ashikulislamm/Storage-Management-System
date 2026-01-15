import User from './user.model.js';
import File from '../files/file.model.js';
import Folder from '../folders/folder.model.js';

/**
 * Get user profile by ID
 */
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

/**
 * Update user profile
 */
const updateUserProfile = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select("-password");

  return user;
};

/**
 * Delete user account (soft delete)
 */
const deleteUserAccount = async (userId) => {
  // Soft delete user
  await User.findByIdAndUpdate(userId, { isDeleted: true });

  // Soft delete all user's files
  await File.updateMany({ owner: userId }, { isDeleted: true });

  // Soft delete all user's folders
  await Folder.updateMany({ owner: userId }, { isDeleted: true });

  return true;
};

export {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
};
