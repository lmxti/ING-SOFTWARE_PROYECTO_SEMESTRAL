//Se declaran las funciones de manejo de errores 
const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");
//Se declara el servicio que llevara a cabo cada proceso de Person
const PersonService = require("../services/personService.js");
//Se declara el esquema de Person para la validacion de datos
const {
  personBodySchema,
  personIdSchema,
} = require("../schema/personSchema.js");

//Se declara la funcion para obtener todas las personas
async function getPersons(req, res) {
  try {
    const [persons, errorPersons] = await PersonService.getPersons();
    if (errorPersons) {
      return respondError(req, res, 400, errorPersons);
    }
    persons.length === 0
      ? respondSuccess(req, res, 200, "No hay personas registradas")
      : respondSuccess(req, res, 200, persons);
  } catch (error) {
    handleError(error, "/personController -> getPersons");
    respondError(req, res, 400, error.message);
  }
}

//Se declara la funcion para crear una persona
async function createPerson(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = personBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }
    const [newPerson, personError] = await PersonService.createPerson(body);
    if (personError) {
      return respondError(req, res, 400, personError);
    }
    if (!newPerson) {
      return respondError(req, res, 400, "No se pudo crear la persona");
    }
  } catch (error) {
    handleError(error, "/personController -> createPerson");
    respondError(req, res, 400, error.message);
  }
}

//Se declara la funcion para obtener una persona por su id
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

//Se declara la funcion para actualizar una persona por su id
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

//Se declara la funcion para eliminar una persona por su id
async function deletePerson(req, res) {
  const { params } = req;
  const { error: paramsError } = personIdSchema.validate(params);
  if (paramsError) {
    return respondError(req, res, 400, paramsError.message);
  }
  const person = await PersonService.deletePersonById(params.id);
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

//Se exportan las funciones
module.exports = {
  getPersons,
  createPerson,
  getPersonById,
  updatePersonById,
  deletePerson,
};