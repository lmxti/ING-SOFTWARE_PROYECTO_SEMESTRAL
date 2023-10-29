"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler.js");
const reviewGrantService = require("../services/reviewGrant.service.js");
const { reviewBodySchema, reviewIdSchema } = require("../schema/reviewGrant.schema.js");
const { handleError } = require("../utils/errorHandler.js");
// const { userSchema } = require("../schema/person.schema.js");
// const { Beca } = require("../models/grant.model.js");

async function createReview(req, res) {
  try {
    const { body } = req;

    const [newRevision, revisionError] = await reviewGrantService.createRevision(body);
    if (revisionError) {
      return respondError(req, res, 400, revisionError);
    }
    if (!newRevision) {
      return respondError(req, res, 400, "No se creo la revivion");
    }
    respondSuccess(req, res, 201, newRevision);
  } catch (error) {
    handleError(error, "reviewGrant.Controller -> createRevision");
    respondError(req, res, 400, error.message);
  }
}

async function getReview(req, res) {
  try {
    // Obtiene todas las revisiones de postulaciones
    const [revision, revisionError] = await reviewGrantService.getRevision();
    
    if (revisionError) {
      return respondError(req, res, 404, revisionError);
    }
    respondSuccess(req, res, 200, revision);
  } catch (error) {
    handleError(error, "reviewGrant.controller -> getRevisiones");
    respondError(req, res, 500, "No se pudo obtener la revision previa");
  }
}

async function deleteReview(req, res) {
    try {
      const { params } = req;
      const { error: paramsError } = revisionIdSchema.validate(params);
      if (paramsError) return respondError(req, res, 400, paramsError.message);
  
      const revision = await reviewGrantService.deleteRevision(params.id);
      !revision
        ? respondError(req,res,404,"No se encontro la revision", "Verifique el id",)
        : respondSuccess(req, res, 200, revision);
    } catch (error) {
      handleError(error, "reviewGrant.controller -> deleteRevision");
      respondError(req, res, 500, "Revision no eliminada");
    }
  }

async function compararUsuarios(req, res) {
  try {
    const { body } = req; 

    const usuarioRegistrado = await User.findOne({
      nombre: body.name,
    });

    if (usuarioRegistrado){
        respondSuccess(req,res,200,"La postulación es valida");
    }else{
      return respondError(req,res,400,"Error en la postulacion, el nombre no coincide con el registrado");
    }
  }catch (error){
    handleError(error,"comparacionUsuarios")
    respondError(req,res,500,"Error al comparar usuarios en la postulación")
  }
}

async function comprobarDocumentos(req, res) {
  try {
    const { body } = req;

    const documentosRequeridos = ["documento1.pdf", "documento2.pdf", "documento3.pdf"];//Pueden agregarse más

    const documentosSubidos = body.documentos;

    if (documentosSubidos.length !== documentosRequeridos.length) {
      return respondError(req, res, 400, "Se requieren " + documentosRequeridos.length + " documentos.");
    }

    const faltanDocumentos = documentosRequeridos.filter(documento => !documentosSubidos.includes(documento));

    if (faltanDocumentos.length > 0) {
      return respondError(req, res, 400, "Faltan los siguientes documentos: " + faltanDocumentos.join(", "));
    }

    respondSuccess(req, res, 200, "Documentos verificados");
  } catch (error) {
    handleError(error, "comprobarDocumentos");
    respondError(req, res, 500, "Error al verificar documentos.");
  }
}

module.exports = {
    createReview,
    getReview,
    deleteReview,
    compararUsuarios,
    comprobarDocumentos,
  };
  