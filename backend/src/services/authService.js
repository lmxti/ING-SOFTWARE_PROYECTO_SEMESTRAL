"use strict";
/** Modelo de datos 'Person' */
const Person = require("../models/person.js");
/** Modulo 'jsonwebtoken' para crear tokens */
const jwt = require("jsonwebtoken");
const {
  ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET,
} = require("../config/env.config.js");
const { handleError } = require("../utils/errorHandler.js");

async function login(person) {
  try {
    const { email, password } = person;

    const personFound = await Person.findOne({ email: email })
      .populate("role")
      .exec();
    if (!personFound) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const matchPassword = await Person.comparePassword(
      password,
      personFound.password
    );

    if (!matchPassword) {
      return [null, null, "El usuario y/o contraseña son "];
    }

    const accessToken = jwt.sign(
      { email: personFound.email, role: personFound.role },
      ACCESS_JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { email: personFound.email },
      REFRESH_JWT_SECRET,
      {
        expiresIn: "7d", // 7 días
      }
    );

    return [accessToken, refreshToken, null];
  } catch (error) {
    handleError(error, "auth.service -> signIn");
  }
}

async function refresh(cookies) {
  try {
    if (!cookies.jwt) return [null, "No hay autorización"];
    const refreshToken = cookies.jwt;

    const accessToken = await jwt.verify(
      refreshToken,
      REFRESH_JWT_SECRET,
      async (err, person) => {
        if (err) return [null, "La sesion a caducado, vuelva a iniciar sesion"];

        const personFound = await Person.findOne({
          email: person.email,
        })
          .populate("role")
          .exec();

        if (!personFound) return [null, "No usuario no autorizado"];

        const accessToken = jwt.sign(
          { email: personFound.email, role: personFound.role },
          ACCESS_JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        return [accessToken, null];
      }
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