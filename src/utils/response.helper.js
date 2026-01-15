/**
 * Send success response
 */
const sendSuccess = (
  res,
  statusCode = 200,
  message = "Success",
  data = null
) => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send error response
 */
const sendError = (
  res,
  statusCode = 500,
  message = "Internal Server Error",
  errors = null
) => {
  const response = {
    success: false,
    message,
  };

  if (errors !== null) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send validation error response
 */
const sendValidationError = (res, errors) => {
  return sendError(res, 400, "Validation Error", errors);
};

export {
  sendSuccess,
  sendError,
  sendValidationError,
};
