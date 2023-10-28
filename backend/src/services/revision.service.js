"use strict";

const Revision = require("../models/revision.model.js");
const { handleError } = require("../utils/errorHandler.js");

async function createRevision(datosRevision) {
  try {
    const nuevaRevision = new Revision(datosRevision);

    const revisionCreada = await nuevaRevision.save();

    return [revisionCreada, null];
  } catch (error) {
    handleError(error, "revision.service -> crearRevision");
    return [null, "Error al crear la revisión"];
  }
}

async function getRevision() {
    try {
      const revisiones = await Revision.find()
      if (!revisiones) return [null, "No hay usuarios"];
  
      return [revisiones, null];
    } catch (error) {
      handleError(error, "revision.service -> getRevisiones");
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