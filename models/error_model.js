class AppError extends Error {
  constructor(message, { statusCode = 500, errorFrom = 0 }) {
    super(message);
    this.statusCode = statusCode;
    this.errorFrom = errorFrom;

    Error.captureStackTrace(this, this.constructor);
  }

  toString() {
    return `Error from ${this.errorFrom} : ${this.message} : ${this.statusCode}`;
  }
}
module.exports = AppError;
