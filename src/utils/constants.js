// HTTP Status Codes
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// File Types
const FILE_TYPES = {
  IMAGE: 'image',
  PDF: 'pdf',
  NOTE: 'note'
};

// Item Types
const ITEM_TYPES = {
  FILE: 'file',
  FOLDER: 'folder'
};

// Activity Actions
const ACTIVITY_ACTIONS = {
  CREATE: 'create',
  UPLOAD: 'upload',
  RENAME: 'rename',
  DUPLICATE: 'duplicate',
  DELETE: 'delete',
  SHARE: 'share',
  FAVORITE: 'favorite',
  UNFAVORITE: 'unfavorite',
  DOWNLOAD: 'download'
};

// Share Permissions
const SHARE_PERMISSIONS = {
  VIEW: 'view',
  EDIT: 'edit'
};

// Success Messages
const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  PROFILE_UPDATED: 'Profile updated successfully',
  USER_DELETED: 'Account deleted successfully',
  FILE_UPLOADED: 'File uploaded successfully',
  FILE_CREATED: 'File created successfully',
  FILE_UPDATED: 'File updated successfully',
  FILE_DELETED: 'File deleted successfully',
  FOLDER_CREATED: 'Folder created successfully',
  FOLDER_UPDATED: 'Folder updated successfully',
  FOLDER_DELETED: 'Folder deleted successfully',
  ITEM_SHARED: 'Item shared successfully',
  SHARE_REVOKED: 'Share access revoked successfully',
  ITEM_FAVORITED: 'Item added to favorites',
  ITEM_UNFAVORITED: 'Item removed from favorites'
};

// Error Messages
const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid email or password',
  TOKEN_INVALID: 'Invalid or expired token',
  UNAUTHORIZED: 'Unauthorized access',
  FILE_NOT_FOUND: 'File not found',
  FOLDER_NOT_FOUND: 'Folder not found',
  ALREADY_FAVORITED: 'Item is already in favorites',
  NOT_IN_FAVORITES: 'Item is not in favorites',
  NOT_FAVORITED: 'Item is not in favorites',
  SHARE_NOT_FOUND: 'Share not found',
  CANNOT_DELETE_NON_EMPTY_FOLDER: 'Cannot delete folder with contents',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_ERROR: 'Internal server error'
};

export {
  STATUS_CODES,
  FILE_TYPES,
  ITEM_TYPES,
  ACTIVITY_ACTIONS,
  SHARE_PERMISSIONS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES
};
