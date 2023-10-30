"use strict"

const Revision = require("../models/reviewGrant.model.js");
const { handleError } = require("../utils/errorHandler.js");

async function createRevision(review) {
  try {
      const { person, documentsGrant, documentsApplication } = review;

      const newReview = new Revision({
        person,
        documentsGrant,
        documentsApplication,
      });
      await newReview.save();
      return [newReview, null];
  } catch (error) {
      handleError(error, "reviewGrant.service -> createReview");
  }
}


async function getRevision() {
  try {
    const revisiones = await Revision.find();

    if (!revisiones || revisiones.length === 0) {
      return [null, "No hay revisiones en la base de datos"];
    }

    return [revisiones, null];
  } catch (error) {
    handleError(error, "reviewGrant.service -> getRevisiones");
    return [null, "Error al obtener las revisiones"];
  }
}

async function deleteRevision (id){
  try {
      return await Revision.findByIdAndDelete(id);
  } catch (error) {
      handleError(error, "reviewGrant.service -> deleteRevision");
  }
}


  module.exports = {
    createRevision,
    getRevision,
    deleteRevision,
  };