"use strict";

const Joi = require("joi");

const solicitudBodySchema = Joi.object({
    person: Joi.object({
        name: Joi.string().required().messages({
            "string.empty": "El nombre no puede estar vacio",
            "any.required": "El nombre es un campo requerido",
            "string.base": "El nombre debe ser de tipo texto",
        }),
        surname: Joi.string().required().messages({
            "string.empty": "El apellido no puede estar vacio",
            "any.required": "El apellido es un campo requerido",
            "string.base": "El apellido debe ser de tipo texto",
        }),
        rut: Joi.string().required().messages({
            "string.empty": "El rut no puede estar vacio",
            "any.required": "El rut es un campo requerido",
        }),
        gender: Joi.string().required().messages({
            "string.empty": "El genero no puede estar vacio",
            "any.required": "El genero es un campo requerido",
            "string.base": "El genero debe ser de tipo texto",
        }),
        address: Joi.string().required().messages({
            "string.empty": "La direccion no puede estar vacia",
            "any.required": "La direccion es un campo requerido",
            "string.base": "La direccion debe ser de tipo texto",
        }),
        phone: Joi.string().required().messages({
            "string.empty": "El telefono no puede estar vacio",
            "any.required": "El telefono es un campo requerido",
            "string.base": "El telefono debe ser de tipo texto",
        }),
        email: Joi.string().required().messages({
            "string.empty": "El correo no puede estar vacio",
            "any.required": "El correo es un campo requerido",
            "string.base": "El correo debe ser de tipo texto",
        }),
    }),
    grant: Joi.string().required().messages({
        "string.empty": "La beca no puede estar vacia",
        "any.required": "La beca es un campo requerido",
        "string.base": "La beca debe ser de tipo texto",
    }),
    state: Joi.string().required().messages({
        "string.empty": "El estado no puede estar vacio",
        "any.required": "El estado es un campo requerido",
        "string.base": "El estado debe ser de tipo texto",
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