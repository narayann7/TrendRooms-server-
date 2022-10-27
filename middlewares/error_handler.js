const AppError = require("../models/error_model");

const errorHanddler = (err, req, res, next) => {
  let data = {
    statusCode: 500,
    message: "internal error",
    originalError: err.message,
  };

  if (err instanceof AppError) {
    data = {
      statusCode: err.statusCode,
      message: "error from middlewareError customErrorClass",
      originalError: err.message,
    };
  }
  return res.status(data.statusCode).json(data);
};
module.exports = errorHanddler;
