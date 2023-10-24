"use strict";
// Importa el modelo de datos 'Beca'
const Beca = require("../models/beca.model.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
 */
async function getBecas() {
  try {
    const becas = await Beca.find()
    if (!becas) return [null, "No hay usuarios"];

    return [becas, null];
  } catch (error) {
    handleError(error, "beca.service -> getUsers");
  }
}

async function createBeca(beca) {
  try {
    const { username, email, password, roles } = beca;

    const becaFound = await Beca.findOne({ email: beca.email });
    if (becaFound) return [null, "El usuario ya existe"];

    const newBeca = new Beca({
        nombre, requisitos, documentos, monto, estado,
    });

    await newBeca.save();

    return [newBeca, null];
  } catch (error) {
    handleError(error, "beca.service -> createBeca");
  }
}

async function getBecaById(id) {
  try {
    const beca = await Beca.findById({ _id: id })
    if (!beca) return [null, "La beca no existe"];

    return [beca, null];
  } catch (error) {
    handleError(error, "beca.service -> getBecaById");
  }
}

async function deleteBeca(id) {
  try {
    return await Beca.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "beca.service -> deleteBeca");
  }
}

module.exports = {
  getBecas,
  createBeca,
  getBecaById,
  deleteBeca,
};