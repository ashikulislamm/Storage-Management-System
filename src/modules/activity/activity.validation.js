import { param, query, validationResult } from 'express-validator';
import { sendValidationError } from '../../utils/response.helper.js';

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

const dateValidation = [
  param("date")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Date must be in YYYY-MM-DD format"),
  validate,
];

const dateRangeValidation = [
  query("startDate")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Start date must be in YYYY-MM-DD format"),
  query("endDate")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("End date must be in YYYY-MM-DD format"),
  validate,
];

export {
  dateValidation,
  dateRangeValidation,
};
