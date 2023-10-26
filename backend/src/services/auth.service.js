// "use strict";

/** Modelo de datos 'Person' */
const Person = require("../models/person.model.js");

/** Modulo 'jsonwebtoken' para crear tokens */
const jwt = require("jsonwebtoken");

const {
  ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET,
} = require("../config/env.config.js");

const { handleError } = require("../utils/errorHandler.js");

/**
 * Inicia sesión con un usuario.
 * @async
 * @function login
 * @param {Object} person - Objeto de usuario
 */
async function login(person) {
  try {
    const { email, password } = person;

    const userFound = await Person.findOne({ email: email })
      .populate("role")
      .exec();
    if (!userFound) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const matchPassword = await Person.comparePassword(
      password,
      userFound.password,
    );

    if (!matchPassword) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const accessToken = jwt.sign(
      { email: userFound.email, role: userFound.role },
      ACCESS_JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const refreshToken = jwt.sign(
      { email: userFound.email },
      REFRESH_JWT_SECRET,
      {
        expiresIn: "7d", // 7 días
      },
    );

    return [accessToken, refreshToken, null];
  } catch (error) {
    handleError(error, "auth.service -> signIn");
  }
}

/**
 * Refresca el token de acceso
 * @async
 * @function refresh
 * @param {Object} cookies - Objeto de cookies
 */
async function refresh(cookies) {
  try {
    if (!cookies.jwt) return [null, "No hay autorización"];
    const refreshToken = cookies.jwt;

    const accessToken = await jwt.verify(
      refreshToken,
      REFRESH_JWT_SECRET,
      async (err, person) => {
        if (err) return [null, "La sesion a caducado, vuelva a iniciar sesion"];

        const userFound = await Person.findOne({
          email: person.email,
        })
          .populate("role")
          .exec();

        if (!userFound) return [null, "No usuario no autorizado"];

        const accessToken = jwt.sign(
          { email: userFound.email, role: userFound.role },
          ACCESS_JWT_SECRET,
          {
            expiresIn: "1d",
          },
        );

        return [accessToken, null];
      },
    );

    return accessToken;
  } catch (error) {
    handleError(error, "auth.service -> refresh");
  }
}

module.exports = {
  login,
  refresh,
};
