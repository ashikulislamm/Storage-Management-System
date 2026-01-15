import { body, param, validationResult } from 'express-validator';
import { sendValidationError } from '../../utils/response.helper.js';
import { SHARE_PERMISSIONS } from '../../utils/constants.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array().map(err => err.msg));
  }
  next();
};

const shareValidation = [
  body('sharedWithEmail')
    .trim()
    .notEmpty().withMessage('Recipient email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('permission')
    .optional()
    .isIn(Object.values(SHARE_PERMISSIONS))
    .withMessage('Permission must be either "view" or "edit"'),
  validate
];

const shareIdValidation = [
  param('shareId').isMongoId().withMessage('Invalid share ID'),
  validate
];

export {
  shareValidation,
  shareIdValidation
};
