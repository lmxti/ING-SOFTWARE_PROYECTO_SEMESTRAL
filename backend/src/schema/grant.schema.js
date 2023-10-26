"use strict";

const Joi = require("joi");

const grantBodySchema = Joi.object({
    
    name: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacio",
        "any.required": "El nombre es un campo requerido",
        "string.base": "El nombre debe ser de tipo texto",
    }),
    requirements: Joi.array().items(Joi.string().required()).required().messages({
        "string.empty": "Los requisitos no pueden estar vacios",
        "any.required": "Los requisitos son un campo requerido",
        "string.base": "Los requisitos deben ser de tipo texto",
    }),
    documents: Joi.array().items(Joi.string().required()).required().messages({
        "string.empty": "Los documentos no pueden estar vacios",
        "any.required": "Los documentos son un campo requerido",
        "string.base": "Los documentos deben ser de tipo texto",
    }),
    amount: Joi.number().required().messages({
        "string.empty": "El monto no puede estar vacio",
        "any.required": "El monto es un campo requerido",
        "string.base": "El monto debe ser de tipo texto",
    }),
}).messages({
  "object.unknown": "No se permiten campos adicionales",
});

module.exports = { grantBodySchema };
