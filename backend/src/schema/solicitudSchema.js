"use strict";

const Joi = require("joi");

const solicitudBodySchema = Joi.object({
    person: Joi.string().required().messages({
        "string.empty": "La persona no puede estar vacia",
        "any.required": "La persona es un campo requerido",
        "string.base": "La persona debe ser de tipo texto",
    }),
    beca: Joi.string().required().messages({
        "string.empty": "La beca no puede estar vacia",
        "any.required": "La beca es un campo requerido",
        "string.base": "La beca debe ser de tipo texto",
    }),
    });

const solicitudIdSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": "El id no puede estar vacio",
        "any.required": "El id es un campo requerido",
        "string.base": "El id debe ser de tipo texto",
    }),
});

module.exports = {
    solicitudBodySchema,
    solicitudIdSchema,
};