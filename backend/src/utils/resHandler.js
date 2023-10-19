"use strict";

function respondSuccess(req, res, statusCode=200, data = {}) {
    return res.status(statusCode).json({
        status: "success",
        data,
    });
}

function respondError(req, res,statusCode=500, message ="Couldnt process the request", details ={}){
    return res.status(statusCode).json({
        status: "error",
        message,
        details
    });
}

function respondInternalError(req,res,statusCode=500, message="Couldnt process the request"){
    return res.status(statusCode).json({
        status: "error",
        message
    });
}

module.exports = {
    respondSuccess,
    respondError,
    respondInternalError
}