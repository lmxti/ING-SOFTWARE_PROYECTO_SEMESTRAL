"use strict";

const Revision = require("../models/reviewGrant.model.js");
const { handleError } = require("../utils/errorHandler.js");

async function createRevision(datosRevision) {
  try {

    const { person, documentsGrant, documentsApplication } = datosRevision;

    const reviewGrant = new Revision({
      person,
      documentsGrant,
      documentsApplication,
    });

    const revisionCreada = await reviewGrant.save();
    return [revisionCreada, null];

  } catch (error) {
    handleError(error, "revision.service -> crearRevision");
    return [null, "Error al crear la revision"];
  }
}

async function getRevision() {
    try {
      const revisiones = await Revision.find()
      if (!revisiones){
        return [null, "No hay revisiones en la base de datos"];
      } 
      return [revisiones, null];
    } catch (error) {
      handleError(error, "reviewGrant.service -> getRevisiones");
    }
  }

async function deleteRevision(id) {
    try {
      return await Revision.findByIdAndDelete(id);
    } catch (error) {
      handleError(error, "revision.service -> deleteRevision");
    }
  }


  module.exports = {
    createRevision,
    getRevision,
    deleteRevision,
  };