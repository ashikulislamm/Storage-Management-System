import upload from '../config/upload.config.js';
import { sendError } from '../utils/response.helper.js';
import { STATUS_CODES } from '../utils/constants.js';

/**
 * Handle single file upload
 */
const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadHandler = upload.single(fieldName);

    uploadHandler(req, res, (err) => {
      if (err) {
        return sendError(res, STATUS_CODES.BAD_REQUEST, err.message);
      }
      next();
    });
  };
};

/**
 * Handle multiple files upload
 */
const uploadMultiple = (fieldName, maxCount = 10) => {
  return (req, res, next) => {
    const uploadHandler = upload.array(fieldName, maxCount);

    uploadHandler(req, res, (err) => {
      if (err) {
        return sendError(res, STATUS_CODES.BAD_REQUEST, err.message);
      }
      next();
    });
  };
};

export {
  uploadSingle,
  uploadMultiple,
};
