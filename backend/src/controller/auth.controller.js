"use strict";
// <-----------------------------SERVICIO DE AUTENTICACION------------------------------->
/*Servicio de autenticacion de usuarios */
const AuthServices = require("../services/auth.service");
/*Esquema de validacion de datos para el inicio de sesion */
const { authLoginBodySchema } = require("../schema/auth.schema");
// <-------------------------------------UTILIDADES-------------------------------------->
/* Funciones que manejan las respuestas HTTP (Envian respuesta de exito o error) */
const { respondSuccess, respondError } = require("../utils/resHandler");
/* Funcion que registra y maneja errores de manera centralizada */
const { handleError } = require("../utils/errorHandler");

/** ---------------------------------------------------------------------------------------
 * @async
 * @function login
 * @description Inicia sesion de usuario y devuelve un token de acceso (admin o user)
 * @param {Object} req - Objeto de petición HTTP (body: {email, password})
 * @param {Object} res - Objeto de respuesta HTTP (token: {accessToken})
 */
async function login(req, res) {
  try {
    const { body } = req;

    // Validacion de datos de entrada
    const { error: bodyError } = authLoginBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);


    const [accessToken, refreshToken, errorToken] = await AuthServices.login(body);

    if (errorToken) return respondError(req, res, 400, errorToken);

    // * Existen mas opciones de seguirdad para las cookies *//
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    respondSuccess(req, res, 200, { accessToken });
  } catch (error) {
    handleError(error, "auth.controller -> login");
    respondError(req, res, 400, error.message);
  }
}

/** ---------------------------------------------------------------------------------------
 * @name logout
 * @description Cierra la sesión del usuario, quita el token
 * @param {Object} req - Objeto de petición HTTP (cookies: {jwt})
 * @param {Object} res - Objeto de respuesta HTTP 
 * @returns
 */
async function logout(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return respondError(req, res, 400, "No hay token");
    res.clearCookie("jwt", { httpOnly: true });
    respondSuccess(req, res, 200, { message: "Sesión cerrada correctamente" });
  } catch (error) {
    handleError(error, "auth.controller -> logout");
    respondError(req, res, 400, error.message);
  }
}

/** ---------------------------------------------------------------------------------------
 * @name refresh
 * @description Refresca el token de acceso
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function refresh(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return respondError(req, res, 400, "No hay token");

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
