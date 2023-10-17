"use strict";
// Autorizacion - Comprobar el rol del usuario
const Person = require("../models/person.model.js");
const Role = require("../models/role.model.js");
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Comprueba si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function isAdmin(req, res, next) {
  try {
    const person = await Person.findOne({ email: req.email });
    const role = await Role.find({ _id: { $in: person.role } });
    for (let i = 0; i < role.length; i++) {
      if (role[i].name === "admin") {
        next();
        return;
      }
    }
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador para realizar esta acción",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

module.exports = {
  isAdmin,
};
