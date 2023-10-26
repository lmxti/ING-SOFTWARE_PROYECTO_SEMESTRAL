"use strict";

function respondSucces(req, res, statusCode = 200, data = {}) {
  return res.status(statusCode).json({
    status: "Success",
    data,
  });
}

function respondError(req, res, statusCode = 500, message = "Could not process request", details = {}) {
  return res.status(statusCode).json({
    status: "Error",
    message,
    details,
  });
}

function respondInternalError(req, res, statusCode = 500, message = "Could not process request",) {
    return res.status(statusCode).json({
        status: "Error",
        message,
    });
}

module.exports = {
  respondSucces,
  respondError,
  respondInternalError,
};