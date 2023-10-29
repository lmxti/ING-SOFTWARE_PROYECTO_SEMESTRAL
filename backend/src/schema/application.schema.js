"use strict";

const Joi = require("joi");

const applicationSchema = Joi.object({

    person: Joi.string().required().messages({
        "string.empty":"La persona no puede quedar vacia",
        "any.required":"La persona es requerida"
    }),
    grant: Joi.string().required().messages({
        "string.empty":"El grant no puede quedar vacio",
        "any.required":"El grant es requerido"
    }),
    documents: Joi.array().items(Joi.string()).required().messages({
        "string.empty":"El documento no puede quedar vacio",
        "any.required":"El documento es requerido"
    }),
});

const applicationIdSchema = Joi.object({
    id: Joi.string().guid().required().messages({
        "string.empty":"El id no puede quedar vacio",
        "any.required":"El id es requerido"
    })
});

module.exports = {
    applicationSchema,
    applicationIdSchema
}