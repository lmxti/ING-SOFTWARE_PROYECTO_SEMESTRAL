// Se importa el modelo que se utiliza
const { respondSuccess, respondError } = require("../utils/resHandler.js");
const BecaService = require("../services/becaService.js");
const { becaBodySchema, becaIdSchema } = require("../schema/becaSchema.js");
const { handleError } = require("../utils/errorHandler.js");

// Crear una beca
async function createBeca(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = becaBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }
    const [newBeca, becaError] = await BecaService.createBeca(body);
    if (becaError) {
      return respondError(req, res, 400, becaError);
    }
    if (!newBeca) {
      return respondError(req, res, 400, "No se pudo crear la beca");
    }
    respondSuccess(req, res, 201, newBeca);
  } catch (error) {
    handleError(error, "becaController -> createBeca");
    respondError(req, res, 400, error.message);
  }
}

// Eliminar una beca
async function deleteBeca(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = becaIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 404, paramsError.message);
    }
    respondSuccess(req, res, 200, beca);
  } catch (error) {
    handleError(error, "becaController -> deleteBeca");
    respondError(req, res, 400, error.message);
  }
}

// Obtener todas las becas
async function getBecas(req, res) {
  try {
    const [becas, becasError] = await BecaService.getBecas();
    if (becasError) {
      return respondError(req, res, 400, becasError);
    }
    becas.length === 0
      ? respondSuccess(req, res, 200, "No hay becas registradas")
      : respondSuccess(req, res, 200, becas);
  } catch (error) {
    handleError(error, "becaController -> getBecas");
    respondError(req, res, 400, error.message);
  }
}

// Actualizar una beca por ID
async function updateBecaID(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = becaIdSchema.validate(body);
    if (paramsError) {
      return respondError(req, res, 404, paramsError.message);
    }
    respondSuccess(req, res, 200, beca);
  } catch (error) {
    handleError(error, "becaController -> updateBecaID");
    respondError(req, res, 400, error.message);
  }
}

// Exportar controladores
module.exports = {
  createBeca,
  deleteBeca,
  getBecas,
  updateBecaID,
};
