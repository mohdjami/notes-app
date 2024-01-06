class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  status: any;

  constructor(message: string, statusCode: number) {
    super(message); // Pass the message to the Error class
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
