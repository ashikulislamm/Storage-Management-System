import * as folderService from './folder.service.js';
import { sendSuccess, sendError } from '../../utils/response.helper.js';
import { STATUS_CODES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../utils/constants.js';

const createFolder = async (req, res, next) => {
  try {
    const { name, parentId } = req.body;
    
    const folderData = {
      name,
      owner: req.user._id,
      parent: parentId || null
    };
    
    const folder = await folderService.createFolder(folderData);
    
    return sendSuccess(res, STATUS_CODES.CREATED, SUCCESS_MESSAGES.FOLDER_CREATED, { folder });
  } catch (error) {
    next(error);
  }
};

const getAllFolders = async (req, res, next) => {
  try {
    const { parentId } = req.query;
    const folders = await folderService.getUserFolders(req.user._id, parentId);
    
    return sendSuccess(res, STATUS_CODES.OK, 'Folders retrieved successfully', { folders });
  } catch (error) {
    next(error);
  }
};

const getFolder = async (req, res, next) => {
  try {
    const folder = await folderService.getFolderById(req.params.folderId, req.user._id);
    
    if (!folder) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FOLDER_NOT_FOUND);
    }
    
    return sendSuccess(res, STATUS_CODES.OK, 'Folder retrieved successfully', { folder });
  } catch (error) {
    next(error);
  }
};

const getFolderContents = async (req, res, next) => {
  try {
    const contents = await folderService.getFolderContents(req.params.folderId, req.user._id);
    
    if (!contents) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FOLDER_NOT_FOUND);
    }
    
    return sendSuccess(res, STATUS_CODES.OK, 'Folder contents retrieved successfully', contents);
  } catch (error) {
    next(error);
  }
};

const renameFolder = async (req, res, next) => {
  try {
    const { name } = req.body;
    const folder = await folderService.renameFolder(req.params.folderId, req.user._id, name);
    
    if (!folder) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FOLDER_NOT_FOUND);
    }
    
    return sendSuccess(res, STATUS_CODES.OK, SUCCESS_MESSAGES.FOLDER_UPDATED, { folder });
  } catch (error) {
    next(error);
  }
};

const duplicateFolder = async (req, res, next) => {
  try {
    const folder = await folderService.duplicateFolder(req.params.folderId, req.user._id);
    
    if (!folder) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FOLDER_NOT_FOUND);
    }
    
    return sendSuccess(res, STATUS_CODES.CREATED, SUCCESS_MESSAGES.ITEM_DUPLICATED, { folder });
  } catch (error) {
    next(error);
  }
};

const deleteFolder = async (req, res, next) => {
  try {
    const folder = await folderService.deleteFolder(req.params.folderId, req.user._id);
    
    if (!folder) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FOLDER_NOT_FOUND);
    }
    
    return sendSuccess(res, STATUS_CODES.OK, SUCCESS_MESSAGES.FOLDER_DELETED);
  } catch (error) {
    if (error.message === 'Cannot delete folder with contents') {
      return sendError(res, STATUS_CODES.BAD_REQUEST, ERROR_MESSAGES.CANNOT_DELETE_NON_EMPTY_FOLDER);
    }
    next(error);
  }
};

export {
  createFolder,
  getAllFolders,
  getFolder,
  getFolderContents,
  renameFolder,
  duplicateFolder,
  deleteFolder
};