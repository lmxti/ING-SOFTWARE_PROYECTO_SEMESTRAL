"use strict";

const Person = require("../models/person.js");
const Role = require("../models/role.js");
const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

async function isAdmin(req, res, next) {
  try {
    const person = await Person.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: person.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador para realizar esta accion"
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

module.exports = isAdmin;
