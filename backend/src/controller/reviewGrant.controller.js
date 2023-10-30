"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler.js");
const reviewGrantService = require("../services/reviewGrant.service.js");
const { reviewBodySchema } = require("../schema/reviewGrant.schema.js");
const { handleError } = require("../utils/errorHandler.js");
const User = require("../models/person.model.js")


async function createReview(req, res) {
  try {
      const { body } = req;
      const { error: bodyError } = reviewBodySchema.validate(body);
      if (bodyError) {
          return respondError(req, res, 400, bodyError.message);
      }
      const [newReview, reviewError] = await reviewGrantService.createRevision(body);
      if (reviewError) {
          return respondError(req, res, 400, reviewError);
      }
      if (!newReview) {
          return respondError(req, res, 400, "No se creo la revision");
      }
      respondSuccess(req, res, 201, {
          message: "Revision creada con exito",
          data: newReview
      });
  } catch (error) {
      handleError(error, "reviewGrant.controller -> createReview");
      respondError(req, res, 400, error.message);
  }
}

async function getReview(req, res) {
  try {
      const [review, errorReview] = await reviewGrantService.getRevision();
      if (errorReview) {
          return respondError(req, res, 400, "Error al obtener las revisiones", errorReview);
      }
      review.length === 0
          ? respondSuccess(req, res, 200, "No hay revisiones registradas")
          : respondSuccess(req, res, 200,{
              message: "Revisiones obtenidas con exito",
              data: review,
      });
  } catch (error) {
      handleError(error, "reviewGrant.controller -> getReview");
      respondError(req, res, 400, error.message);
  }
}

async function deleteReview(req, res) {
  try {
      const { id } = req.params;
      const review = await reviewGrantService.deleteRevision(id);
      !review
          ? respondError(req, res, 400, `No se ha eliminado la revision`)
          : respondSuccess(req, res, 200, {
              message: "Revision eliminada con exito",
              data: review
          });
  } catch (error) {
      handleError(error, "reviewGrant.controller -> deleteReview");
      respondError(req, res, 400, error.message);
  }
}

async function compararUsuarios(req, res) {
  try {
    const { body } = req; 

    const usuarioRegistrado = await User.findOne({
      name: body.name,
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

/*async function comprobarDocumentos(req, res) {
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
}*/

module.exports = {
    createReview,
    getReview,
    deleteReview,
    compararUsuarios,
    // comprobarDocumentos,
  };
  