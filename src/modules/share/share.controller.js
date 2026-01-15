import * as shareService from './share.service.js';
import { sendSuccess, sendError } from '../../utils/response.helper.js';
import { STATUS_CODES, SUCCESS_MESSAGES, ERROR_MESSAGES, ITEM_TYPES } from '../../utils/constants.js';

const shareFile = async (req, res, next) => {
  try {
    const { sharedWithEmail, permission } = req.body;
    
    const share = await shareService.shareItem(
      req.user._id,
      ITEM_TYPES.FILE,
      req.params.fileId,
      sharedWithEmail,
      permission
    );
    
    return sendSuccess(res, STATUS_CODES.CREATED, SUCCESS_MESSAGES.ITEM_SHARED, { share });
  } catch (error) {
    if (error.message === 'Recipient user not found') {
      return sendError(res, STATUS_CODES.NOT_FOUND, 'Recipient user not found');
    }
    if (error.message === 'Cannot share with yourself') {
      return sendError(res, STATUS_CODES.BAD_REQUEST, 'Cannot share with yourself');
    }
    if (error.message.includes('Item not found')) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FILE_NOT_FOUND);
    }
    next(error);
  }
};

const shareFolder = async (req, res, next) => {
  try {
    const { sharedWithEmail, permission } = req.body;
    
    const share = await shareService.shareItem(
      req.user._id,
      ITEM_TYPES.FOLDER,
      req.params.folderId,
      sharedWithEmail,
      permission
    );
    
    return sendSuccess(res, STATUS_CODES.CREATED, SUCCESS_MESSAGES.ITEM_SHARED, { share });
  } catch (error) {
    if (error.message === 'Recipient user not found') {
      return sendError(res, STATUS_CODES.NOT_FOUND, 'Recipient user not found');
    }
    if (error.message === 'Cannot share with yourself') {
      return sendError(res, STATUS_CODES.BAD_REQUEST, 'Cannot share with yourself');
    }
    if (error.message.includes('Item not found')) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FOLDER_NOT_FOUND);
    }
    next(error);
  }
};

const getSharedWithMe = async (req, res, next) => {
  try {
    const shares = await shareService.getSharedWithMe(req.user._id);
    
    return sendSuccess(res, STATUS_CODES.OK, 'Shared items retrieved successfully', shares);
  } catch (error) {
    next(error);
  }
};

const getMyShares = async (req, res, next) => {
  try {
    const shares = await shareService.getMyShares(req.user._id);
    
    return sendSuccess(res, STATUS_CODES.OK, 'My shares retrieved successfully', { shares });
  } catch (error) {
    next(error);
  }
};

const revokeShare = async (req, res, next) => {
  try {
    await shareService.revokeShare(req.params.shareId, req.user._id);
    
    return sendSuccess(res, STATUS_CODES.OK, SUCCESS_MESSAGES.SHARE_REVOKED);
  } catch (error) {
    if (error.message.includes('Share not found')) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.SHARE_NOT_FOUND);
    }
    next(error);
  }
};

export {
  shareFile,
  shareFolder,
  getSharedWithMe,
  getMyShares,
  revokeShare
};