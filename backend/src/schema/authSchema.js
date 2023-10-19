"use strict";

const Joi = require("joi");

const authLoginBodySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "El email no puede quedar vacio",
    "any.required": "El email es obligatorio",
    "string.base": "El email debe ser de tipo texto",
    "string.email": "El email debe ser valido",
  }),
  password: Joi.string().required().messages({
    "string.empty": "La contraseña no puede quedar vacia",
    "any.required": "La contraseña es obligatoria",
    "string.base": "La contraseña debe ser de tipo texto",
  }),
}).messages({
  "object.unknown": "No se permiten campos extra",
});

module.exports = {
  authLoginBodySchema,
};
