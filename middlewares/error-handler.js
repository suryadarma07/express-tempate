class ErrorResponse {
    constructor(message, statusCode = 500) {
      this.message = message;
      this.statusCode = statusCode;
    }
  
    static error(message, statusCode = 500) {
      return new ErrorResponse(message, statusCode);
    }
  }
  
  const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
  
    res.status(statusCode).json(ErrorResponse.error(message, statusCode));
  };
  
  module.exports = { ErrorResponse, errorHandler };
  