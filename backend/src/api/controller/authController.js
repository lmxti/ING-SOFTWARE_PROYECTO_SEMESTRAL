"use strict";

const { respondSuccess, respondError } = require("../../utils/resHandler");
const { handleError } = require("../../utils/errorHandler");

const AuthServices = require("../services/authServices");
const { authLoginBodySchema } = require("../schema/authSchemas");

async function login(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = authLoginBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [accessToken, refreshToken, errorToken] = await AuthServices.login(
      body
    );

    if (errorToken) return respondError(req, res, 400, errorToken);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    handleError(error, "auth.controller -> login");
    respondError(req, res, 400, error.message);
  }
}

async function logout(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies.jwt) return respondError(req, res, 400, "No hay token");
    res.clearCookie("jwt", { httpOnly: true });
    respondSuccess(req, res, 200, "Sesión cerrada");
  } catch (error) {
    handleError(error, "auth.controller -> logout");
    respondError(req, res, 400, error.message);
  }
}

async function refresh(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies.jwt) return respondError(req, res, 400, "No hay token");

    const [accessToken, errorToken] = await AuthServices.refresh(cookies);

    if (errorToken) return respondError(req, res, 400, errorToken);

    respondSuccess(req, res, 200, { accessToken });
  } catch (error) {
    handleError(error, "auth.controller -> refresh");
    respondError(req, res, 400, error.message);
  }
}

module.exports = {
  login,
  logout,
  refresh,
};
