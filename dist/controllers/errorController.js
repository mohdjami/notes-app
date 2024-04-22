"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleError(err, req, res, next) {
    if (err.isOperational) {
        res.status(err.statusCode).send({ message: err.message });
    }
    else {
        console.error(err);
        res.status(500).send({ message: "Something went wrong" });
    }
}
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    // operational trusted error send directly to the client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
        // programming error or other unknown error: don't leak details
    }
    else {
        // log the error
        console.log("ERROR", err);
        // send generic msg
        res.status(500).json({
            status: "error",
            message: "something went very wrong",
        });
    }
};
exports.default = (err, req, res, next) => {
    console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        sendErrorProd(error, res);
    }
};
