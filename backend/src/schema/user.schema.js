"use strict";

const Joi = require("joi");
const ROLES = require("../constants/roles.constants.js");

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const userBodySchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre de usuario no puede estar vacío.",
    "any.required": "El nombre de usuario es obligatorio.",
    "string.base": "El nombre de usuario debe ser de tipo string.",
  }),
  contrasenia: Joi.string().required().min(5).messages({
    "string.empty": "La contrasenia no puede estar vacia",
    "any.required": "La contrasenia es un campo requerido",
    "string.base": "La contrasenia debe ser de tipo texto",
    "string.min": "La contrasenia debe tener al menos 5 caracteres",
  }),
  apellido: Joi.string().required().messages({
    "string.empty": "El apellido no puede estar vacio",
    "any.required": "El apellido es un campo requerido",
    "string.base": "El apellido debe ser de tipo texto",
  }),
  rut: Joi.string().required().messages({
    "string.empty": "El rut no puede estar vacio",
    "any.required": "El rut es un campo requerido",
    "string.base": "El rut debe ser de tipo texto",
  }),
  sexo: Joi.string().required().messages({
    "string.empty": "El genero no puede estar vacio",
    "any.required": "El genero es un campo requerido",
    "string.base": "El genero debe ser de tipo texto",
  }),
  fechaNacimiento: Joi.date().required().messages({
    "string.empty": "La fecha de nacimiento no puede estar vacia",
    "any.required": "La fecha de nacimiento es un campo requerido",
    "string.base": "La fecha de nacimiento debe ser de tipo texto",
  }),
  direccion: Joi.string().required().messages({
    "string.empty": "La direccion no puede estar vacia",
    "any.required": "La direccion es un campo requerido",
    "string.base": "La direccion debe ser de tipo texto",
  }),
  telefono: Joi.string().required().messages({
    "string.empty": "El telefono no puede estar vacio",
    "any.required": "El telefono es un campo requerido",
    "string.base": "El telefono debe ser de tipo texto",
  }),
  correo: Joi.string().required().messages({
    "string.empty": "El correo electronico no puede estar vacio",
    "any.required": "El correo electronico es un campo requerido",
    "string.base": "El correo electronico debe ser de tipo texto",
    "string.email": "El correo electronico debe ser valido",
  }),
  
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const userIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

module.exports = { userBodySchema, userIdSchema };
