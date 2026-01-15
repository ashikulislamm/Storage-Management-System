import { body, validationResult } from 'express-validator';
import { sendValidationError } from '../../utils/response.helper.js';

/**
 * Validation middleware
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendValidationError(
      res,
      errors.array().map((err) => err.msg)
    );
  }
  next();
};

/**
 * Update profile validation
 */
const updateProfileValidation = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),
  validate,
];

export {
  updateProfileValidation,
};
