import * as fileService from './file.service.js';
import { sendSuccess, sendError } from '../../utils/response.helper.js';
import { STATUS_CODES, SUCCESS_MESSAGES, ERROR_MESSAGES, FILE_TYPES } from '../../utils/constants.js';

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, STATUS_CODES.BAD_REQUEST, 'No file uploaded');
    }
    
    const fileData = {
      name: req.file.originalname,
      type: FILE_TYPES.IMAGE,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype,
      owner: req.user._id,
      folder: req.body.folderId || null
    };
    
    const file = await fileService.createFile(fileData);
    
    return sendSuccess(res, STATUS_CODES.CREATED, SUCCESS_MESSAGES.FILE_UPLOADED, { file });
  } catch (error) {
    next(error);
  }
};

const uploadPdf = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, STATUS_CODES.BAD_REQUEST, 'No file uploaded');
    }
    
    const fileData = {
      name: req.file.originalname,
      type: FILE_TYPES.PDF,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype,
      owner: req.user._id,
      folder: req.body.folderId || null
    };
    
    const file = await fileService.createFile(fileData);
    
    return sendSuccess(res, STATUS_CODES.CREATED, SUCCESS_MESSAGES.FILE_UPLOADED, { file });
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const { title, content, folderId } = req.body;
    
    const fileData = {
      name: title,
      type: FILE_TYPES.NOTE,
      content,
      size: Buffer.byteLength(content, 'utf8'),
      owner: req.user._id,
      folder: folderId || null
    };
    
    const file = await fileService.createFile(fileData);
    
    return sendSuccess(res, STATUS_CODES.CREATED, SUCCESS_MESSAGES.FILE_CREATED, { file });
  } catch (error) {
    next(error);
  }
};

const getAllFiles = async (req, res, next) => {
  try {
    const { folderId } = req.query;
    const files = await fileService.getUserFiles(req.user._id, folderId);
    
    return sendSuccess(res, STATUS_CODES.OK, 'Files retrieved successfully', { files });
  } catch (error) {
    next(error);
  }
};

const getFile = async (req, res, next) => {
  try {
    const file = await fileService.getFileById(req.params.fileId, req.user._id);
    
    if (!file) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FILE_NOT_FOUND);
    }
    
    return sendSuccess(res, STATUS_CODES.OK, 'File retrieved successfully', { file });
  } catch (error) {
    next(error);
  }
};

const renameFile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const file = await fileService.renameFile(req.params.fileId, req.user._id, name);
    
    if (!file) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FILE_NOT_FOUND);
    }
    
    return sendSuccess(res, STATUS_CODES.OK, SUCCESS_MESSAGES.FILE_UPDATED, { file });
  } catch (error) {
    next(error);
  }
};

const duplicateFile = async (req, res, next) => {
  try {
    const file = await fileService.duplicateFile(req.params.fileId, req.user._id);
    
    if (!file) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FILE_NOT_FOUND);
    }
    
    return sendSuccess(res, STATUS_CODES.CREATED, SUCCESS_MESSAGES.ITEM_DUPLICATED, { file });
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const file = await fileService.deleteFile(req.params.fileId, req.user._id);
    
    if (!file) {
      return sendError(res, STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.FILE_NOT_FOUND);
    }
    
    return sendSuccess(res, STATUS_CODES.OK, SUCCESS_MESSAGES.FILE_DELETED);
  } catch (error) {
    next(error);
  }
};

export {
  uploadImage,
  uploadPdf,
  createNote,
  getAllFiles,
  getFile,
  renameFile,
  duplicateFile,
  deleteFile
};