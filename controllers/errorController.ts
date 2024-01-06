import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

function handleError(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err.isOperational) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    console.error(err);
    res.status(500).send({ message: "Something went wrong" });
  }
}

const sendErrorDev = (err: AppError, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response): void => {
  // operational trusted error send directly to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming error or other unknown error: don't leak details
  } else {
    // log the error
    console.log("ERROR", err);
    // send generic msg
    res.status(500).json({
      status: "error",
      message: "something went very wrong",
    });
  }
};

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    sendErrorProd(error, res);
  }
};
