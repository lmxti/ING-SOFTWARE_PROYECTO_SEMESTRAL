const { respondSuccess, respondError } = require("../utils/resHandler.js");
const PersonService = require("../services/person.service.js");
const {
  personBodySchema,
  personIdSchema,
} = require("../schema/person.schema.js");
const { handleError } = require("../utils/errorHandler.js");
const Person = require("../models/person.model.js");

// <----------------------------- Obtener todas las personas ----------------------------->
/**
 * Obtiene todas las personas de la base de datos
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 */

async function getPersons(req, res) {
  try {
    // Obtiene todas las personas
    const [persons, errorPersons] = await PersonService.getPersons();
    // Verificacion de errores
    if (errorPersons) {
      return respondError(
        res,
        500,
        "Error al obtener las personas",
        errorPersons
      );
    }
    persons.length === 0
      ? respondSuccess(req, res, 200, "No hay personas registradas")
      : respondSuccess(req, res, 200, {
          message: "Personas obtenidas con exito",
          data: persons,
        });
  } catch (error) {
    handleError(error, "person.controller -> getPersons");
    respondError(req, res, 400, error.message);
  }
}

// <----------------------------- Crear una persona ----------------------------->

/**
 * Crea una nueva persona en la base de datos
 *@param {Object} req - Objeto de solicitud
 *@param {Object} res - Objeto de respuesta
 */

async function createPerson(req, res) {
  try {
    const { body } = req;
    // Validacion de campos de body
    const { error: bodyError } = personBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newPerson, personError] = await PersonService.createPerson(body);
    // Error de createPerson
    if (personError) return respondError(req, res, 400, personError);
    // Error si no hay datos (false)
    if (!newPerson) return respondError(req, res, 400, "No se creo el usuario");
    // Se crea un usuario y se responde con 201
    respondSuccess(req, res, 201, newPerson);
  } catch (error) {
    handleError(error, "person.controller -> createPerson");
    respondError(req, res, 500, "No se creo la persona");
  }
}

// <------------------------ Obtener una persona por id ------------------------->
/**
 * Obtiene una persona por id
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 */

async function getPersonById(req, res) {
  try {
    const { params } = req;
    // Validacion de parametros de request
    const { error: paramsError } = personIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const [person, personError] = await PersonService.getPersonById(params.id);
    // Verificacion de errores
    if (personError) {
      return respondError(req, res, 404, personError);
    }
    respondSuccess(req, res, 200, person);
  } catch (error) {
    handleError(error, "person.controller -> getPersonById");
    respondError(req, res, 500, "No se obtuvo la persona");
  }
}

// <------------------------ Actualizar una persona por id ------------------------->
/**
 * Actualiza una persona por id
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 */

async function updatePersonById(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = personIdSchema.validate(params);
    // Validacion de parametros
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }
    const [person, personError] = await PersonService.updatePersonById(
      params.id,
      body
    );
    // Verificacion de errores
    if (personError) {
      return respondError(req, res, 400, personError);
    }
    respondSuccess(req, res, 200, person);
  } catch (error) {
    handleError(error, "person.controller -> updatePersonById");
    respondError(req, res, 500, "No se actualizo la persona");
  }
}
// <------------------------ Eliminar una persona por id ------------------------->
/**
 * Elimina una persona por id
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 */

async function deletePerson() {
  const { params } = req;
  const { error: paramsError } = personIdSchema.validate(params);
  if (paramsError) {
    return respondError(req, res, 400, paramsError.message);
  }
  const person = await PersonService.deletePerson(params.id);
  if (!person) {
    respondError(
      req,
      res,
      400,
      "No se elimino la persona, verifique el id ingresado"
    );
  } else {
    respondSuccess(req, res, 200, person);
  }
}

module.exports = {
  getPersons,
  createPerson,
  getPersonById,
  updatePersonById,
  deletePerson,
};
