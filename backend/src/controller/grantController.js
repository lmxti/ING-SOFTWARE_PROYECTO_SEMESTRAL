//Se declaran las funciones de manejo de errores
const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");
//Se declara el servicio que llevara a cabo cada proceso de Beca
const GrantService = require("../services/grantService.js");
//Se declara el esquema de Beca para la validacion de datos
const { grantBodySchema, grantIdSchema } = require("../schema/grantSchema.js");

//Crear una beca
async function createGrant(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = grantBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }
    const [newGrant, grantError] = await GrantService.createGrant(body);
    if (grantError) {
      return respondError(req, res, 400, grantError);
    }
    if (!newGrant) {
      return respondError(req, res, 400, "No se pudo crear la beca");
    }
    respondSuccess(req, res, 201, newGrant);
  } catch (error) {
    handleError(error, "grantController -> createGrant");
    respondError(req, res, 400, error.message);
  }
}

//Eliminar una beca
async function deleteGrant(req, res) {
    const { params } = req;
    const { error: paramsError } = grantIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 404, paramsError.message);
    }
    const grant = await GrantService.deleteGrantById(params.id);
    if (!grant) {
      return respondError(req, res, 404, "No existe la beca");
    }else{
      respondSuccess(req, res, 200, grant);
    }
}

//Obtener todas las becas
async function getGrants(req, res) {
  try {
    const [grants, grantError] = await GrantService.getGrants();
    if (grantError) {
      return respondError(req, res, 400, grantError);
    }
    grants.length === 0
      ? respondSuccess(req, res, 200, "No hay becas registradas")
      : respondSuccess(req, res, 200, grants);
  } catch (error) {
    handleError(error, "grantController -> getGrants");
    respondError(req, res, 400, error.message);
  }
}

//Actualizar una beca por ID
async function updateGrantID(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = grantIdSchema.validate(body);
    if (paramsError) {
      return respondError(req, res, 404, paramsError.message);
    }
    respondSuccess(req, res, 200, beca);
  } catch (error) {
    handleError(error, "grantController -> updateGrantID");
    respondError(req, res, 400, error.message);
  }
}

//Exportar controladores
module.exports = {
  createGrant,
  deleteGrant,
  getGrants,
  updateGrantID,
};
