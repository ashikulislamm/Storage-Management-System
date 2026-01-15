import { body, param, validationResult } from 'express-validator';
import { sendValidationError } from '../../utils/response.helper.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array().map(err => err.msg));
  }
  next();
};

const createNoteValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('folderId').optional().isMongoId().withMessage('Invalid folder ID'),
  validate
];

const renameFileValidation = [
  param('fileId').isMongoId().withMessage('Invalid file ID'),
  body('name').trim().notEmpty().withMessage('File name is required'),
  validate
];

const fileIdValidation = [
  param('fileId').isMongoId().withMessage('Invalid file ID'),
  validate
];

export {
  createNoteValidation,
  renameFileValidation,
  fileIdValidation
};