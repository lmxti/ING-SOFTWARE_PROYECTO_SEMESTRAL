"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler.js");
const RevisionService = require("../services/revision.service.js");
//const { revisionBodySchema, revisionIdSchema } = require("../schema/revision.schema.js");
const { handleError } = require("../utils/errorHandler.js");

async function getRevision(req, res) {
  try {
    const [revisiones, errorRevisiones] = await RevisionService.getRevision();
    if (errorUsuarios) return respondError(req, res, 404, errorUsuarios);

    usuarios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, usuarios);
  } catch (error) {
    handleError(error, "revision.controller -> getRevision");
    respondError(req, res, 400, error.message);
  }
}
async function deleteRevision(req, res) {
    try {
      const { params } = req;
      const { error: paramsError } = revisionIdSchema.validate(params);
      if (paramsError) return respondError(req, res, 400, paramsError.message);
  
      const revision = await RevisionService.deleteRevision(params.id);
      !revision
        ? respondError(
            req,
            res,
            404,
            "No se encontro el usuario solicitado",
            "Verifique el id ingresado",
          )
        : respondSuccess(req, res, 200, revision);
    } catch (error) {
      handleError(error, "revision.controller -> deleteRevision");
      respondError(req, res, 500, "Revision no eliminada");
    }
  }

module.exports = {
    getRevision,
    deleteRevision,
  };
  