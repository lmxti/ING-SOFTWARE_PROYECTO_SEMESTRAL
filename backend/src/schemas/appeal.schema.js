
const Joi = require('joi');

const appealBodySchema = Joi.object({

    user: Joi.string().required().messages({
        "string.empty":"El campo usuario no puede estar vacio",
        "any.required":"El campo usuario es obligatorio",
        "string.base":"El campo usuario debe ser de tipo texto",
    }),
    reason: Joi.string().required().messages({
        "string.empty":"El campo motivo no puede estar vacio",
        "any.required":"El campo motivo es obligatorio",
        "string.base":"El campo motivo debe ser de tipo texto",
    }),
    attachments: Joi.array().items(Joi.string().required()).required().messages({
        "string.empty":"El campo adjuntos no puede estar vacio",
        "any.required":"El campo adjuntos es obligatorio",
        "string.base":"El campo adjuntos debe ser de tipo texto",
    }),
    // status: Joi.string().valid("Aceptado", "Rechazado", "Pendiente").default("Pendiente").messages({
    //     "string.empty":"El campo estado no puede estar vacio",
    //     "any.required":"El campo estado es obligatorio",
    //     "string.base":"El campo estado debe ser de tipo texto",
    //     "any.only":"El campo estado debe ser Aceptado, Rechazado o Pendiente",
    // }),
}).messages({
    "object.unknown": "No se permiten campos extra",
});

module.exports = { appealBodySchema };