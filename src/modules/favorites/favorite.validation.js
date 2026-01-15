import { param, validationResult } from 'express-validator';
import { sendValidationError } from '../../utils/response.helper.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array().map(err => err.msg));
  }
  next();
};

const itemIdValidation = [
  param('fileId').optional().isMongoId().withMessage('Invalid file ID'),
  param('folderId').optional().isMongoId().withMessage('Invalid folder ID'),
  validate
];

export {
  itemIdValidation
};