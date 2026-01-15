import { body, param, validationResult } from 'express-validator';
import { sendValidationError } from '../../utils/response.helper.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array().map(err => err.msg));
  }
  next();
};

const createFolderValidation = [
  body('name').trim().notEmpty().withMessage('Folder name is required'),
  body('parentId').optional().isMongoId().withMessage('Invalid parent folder ID'),
  validate
];

const renameFolderValidation = [
  param('folderId').isMongoId().withMessage('Invalid folder ID'),
  body('name').trim().notEmpty().withMessage('Folder name is required'),
  validate
];

const folderIdValidation = [
  param('folderId').isMongoId().withMessage('Invalid folder ID'),
  validate
];

export {
  createFolderValidation,
  renameFolderValidation,
  folderIdValidation
};