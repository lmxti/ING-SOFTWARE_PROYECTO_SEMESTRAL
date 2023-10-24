"use strict";

const Joi = require("joi");

const becaBodySchema = Joi.object({
    nombre: Joi.string().required().messages({
        "string.empty": "El nombre de beca no puede estar vacío.",
        "any.required": "El nombre de beca es obligatorio.",
        "string.base": "El nombre de beca debe ser de tipo string.",
    }),
    requisitos: Joi.string().required().messages({
        "string.empty": "Los requisitos de beca no puede estar vacío.",
        "any.required": "Los requisitos de beca es obligatorio.",
        "string.base": "Los requisitos de beca debe ser de tipo string.",
    }),
    documentos: Joi.string().required().messages({
        "string.empty": "Los documentos de beca no puede estar vacío.",
        "any.required": "Los documentos de beca es obligatorio.",
        "string.base": "Los documentos de beca debe ser de tipo string.",
    }),
    monto: Joi.string().required().messages({
        "string.empty": "El monto de beca no puede estar vacío.",
        "any.required": "El monto de beca es obligatorio.",
        "string.base": "El monto de beca debe ser de tipo string.",
    }),
    estado: Joi.string().required().messages({
        "string.empty": "El estado de beca no puede estar vacío.",
        "any.required": "El estado de beca es obligatorio.",
        "string.base": "El estado de beca debe ser de tipo string.",
    }),
    
});
const becaIdSchema = Joi.object({
    id: Joi.string()
      .required()
      .messages({
        "string.empty": "El id no puede estar vacío.",
        "any.required": "El id es obligatorio.",
        "string.base": "El id debe ser de tipo string.",
      }),
  });
  module.exports = {becaBodySchema, becaIdSchema};