"use strict";

const Joi = require("joi");

const reviewBodySchema = Joi.object({
    person: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacio",
        "any.required": "El nombre es un campo requerido",
        "string.base": "El nombre debe ser de tipo texto",
      }),
    documentsGrant: Joi.array().items(Joi.string()).required().messages({
        "string.empty": "Los documentos no pueden estar vacios",
        "any.required": "Los documentos son un campo requerido",
        "string.base": "Los documentos deben ser de tipo texto",
    }),
    documentsApplication: Joi.array().items(Joi.string()).required().messages({
        "string.empty": "La revision no pueden estar vacios",
        "any.required": "La revision son un campo requerido",
        "string.base": "La revision deben ser de tipo texto",
      }),
}).messages({
  "object.unknown": "No se permiten campos extra",
});

const reviewIdSchema = Joi.object({
    id: Joi.string().required().messages({
      "string.empty": "El id no puede estar vacio",
      "any.required": "El id es un campo requerido",
      "string.base": "El id debe ser de tipo texto",
    }),
});

module.exports = {
    reviewBodySchema,
    reviewIdSchema,
  };