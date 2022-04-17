// Class that represents an error in our API.
class ApiError extends Error {
  private statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Exports.
export default ApiError;
