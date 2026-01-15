import * as favoriteService from './favorite.service.js';
import { sendSuccess, sendError } from '../../utils/response.helper.js';
import { STATUS_CODES, SUCCESS_MESSAGES, ERROR_MESSAGES, ITEM_TYPES } from '../../utils/constants.js';

const addFileFavorite = async (req, res, next) => {
  try {
    const favorite = await favoriteService.addToFavorites(
      req.user._id,
      ITEM_TYPES.FILE,
      req.params.fileId
    );
    
    return sendSuccess(res, STATUS_CODES.CREATED, SUCCESS_MESSAGES.ITEM_FAVORITED, { favorite });
  } catch (error) {
    if (error.message === 'Item is already in favorites') {
      return sendError(res, STATUS_CODES.CONFLICT, ERROR_MESSAGES.ALREADY_FAVORITED);
    }
    if (error.message === 'Item not found') {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FILE_NOT_FOUND);
    }
    next(error);
  }
};

const addFolderFavorite = async (req, res, next) => {
  try {
    const favorite = await favoriteService.addToFavorites(
      req.user._id,
      ITEM_TYPES.FOLDER,
      req.params.folderId
    );
    
    return sendSuccess(res, STATUS_CODES.CREATED, SUCCESS_MESSAGES.ITEM_FAVORITED, { favorite });
  } catch (error) {
    if (error.message === 'Item is already in favorites') {
      return sendError(res, STATUS_CODES.CONFLICT, ERROR_MESSAGES.ALREADY_FAVORITED);
    }
    if (error.message === 'Item not found') {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FOLDER_NOT_FOUND);
    }
    next(error);
  }
};

const removeFileFavorite = async (req, res, next) => {
  try {
    await favoriteService.removeFromFavorites(
      req.user._id,
      ITEM_TYPES.FILE,
      req.params.fileId
    );
    
    return sendSuccess(res, STATUS_CODES.OK, SUCCESS_MESSAGES.ITEM_UNFAVORITED);
  } catch (error) {
    if (error.message === 'Item is not in favorites') {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FAVORITED);
    }
    next(error);
  }
};

const removeFolderFavorite = async (req, res, next) => {
  try {
    await favoriteService.removeFromFavorites(
      req.user._id,
      ITEM_TYPES.FOLDER,
      req.params.folderId
    );
    
    return sendSuccess(res, STATUS_CODES.OK, SUCCESS_MESSAGES.ITEM_UNFAVORITED);
  } catch (error) {
    if (error.message === 'Item is not in favorites') {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FAVORITED);
    }
    next(error);
  }
};

const getAllFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteService.getUserFavorites(req.user._id);
    
    return sendSuccess(res, STATUS_CODES.OK, 'Favorites retrieved successfully', favorites);
  } catch (error) {
    next(error);
  }
};

export {
  addFileFavorite,
  addFolderFavorite,
  removeFileFavorite,
  removeFolderFavorite,
  getAllFavorites
};