"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler.js");
const RevisionService = require("../services/revision.service.js");
const { revisionBodySchema, revisionIdSchema } = require("../schema/revision.schema.js");
const { handleError } = require("../utils/errorHandler.js");
const { userSchema } = require("../schema/user.schema.js");

async function createRevision(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = revisionBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }
    const [newRevision, revisionError] = await RevisionService.createRevision(body);
    if (revisionError) {
      return respondError(req, res, 400, revisionError);
    }
    if (!newRevision) {
      return respondError(req, res, 400, "No se creo la revivion");
    }
    respondSuccess(req, res, 201, newRevision);
  } catch (error) {
    handleError(error, "revisionController -> createRevision");
    respondError(req, res, 400, error.message);
  }
}



async function getRevision(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = revisionIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const [revision, revisionError] = await RevisionService.getRevision(params.id);
    // Verificacion de errores
    if (revisionError) {
      return respondError(req, res, 404, revisionError);
    }
    respondSuccess(req, res, 200, revision);
  } catch (error) {
    handleError(error, "revision.controller -> getRevision");
    respondError(req, res, 500, "No se pudo obtener la revision previa");
  }
}

async function deleteRevision(req, res) {
    try {
      const { params } = req;
      const { error: paramsError } = revisionIdSchema.validate(params);
      if (paramsError) return respondError(req, res, 400, paramsError.message);
  
      const revision = await RevisionService.deleteRevision(params.id);
      !revision
        ? respondError(req,res,404,"No se encontro la revision", "Verifique el id",)
        : respondSuccess(req, res, 200, revision);
    } catch (error) {
      handleError(error, "revision.controller -> deleteRevision");
      respondError(req, res, 500, "Revision no eliminada");
    }
  }

async function compararDatosEnviados(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = userSchema.validate(body); 

    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }

    const usuarioActual = req.user; 

    const datosRepetidos = compararDatos(usuarioActual, body);

    if (datosRepetidos.length > 0) {
      return respondError(req, res, 400, "Se encontraron datos repetidos", datosRepetidos);
    }

    respondSuccess(req, res, 200, "No se encontraron datos repetidos");
  } catch (error) {
    handleError(error, "compararDatosDePostulantes");
    respondError(req, res, 500, "Error al comparar datos de postulantes");
  }
}

function compararDatos(usuarioActual, datosPostulante) {
  const datosRepetidos = [];

  if (usuarioActual.nombre === datosPostulante.nombre) {
    datosRepetidos.push("nombre");
  }

  if (usuarioActual.rut === datosPostulante.rut) {
    datosRepetidos.push("rut");

  return datosRepetidos;
  }
}

module.exports = {
    createRevision,
    getRevision,
    deleteRevision,
    compararDatosEnviados,
  };
  