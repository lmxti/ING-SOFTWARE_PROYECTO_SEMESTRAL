"use strict"

const Beca = require("../models/beca.js");
const { handleError } = require("../utils/errorHandler.js");

async function getBecas() {
    try {
        const becas = await Beca.find();
        if (!becas) {
            return [null, "No hay becas en la base de datos"];
        }
        return [becas, null];
    } catch (error) {
        handleError(error, "becaService -> getBecas");
    }
}

async function createBeca(beca) {
    try {
        const { name, requirements, documents, amount, state } = beca;
        const newBeca = new Beca({
            name,
            requirements,
            documents,
            amount,
            state
        });
        await newBeca.save();
        return [newBeca, null];
    } catch (error) {
        handleError(error, "becaService -> createBeca");
    }
}

async function getBecaById(id) {
    try {
        const beca = await Beca.findById(id);
        if (!beca) {
            return [null, "No existe la beca"];
        }
        return [beca, null];
    } catch (error) {
        handleError(error, "becaService -> getBecaById");
    }
}

async function deleteBecaById(id) {
    try {
        const beca = await Beca.findByIdAndDelete(id);
        if (!beca) {
            return [null, "No existe la beca"];
        }
        return [beca, null];
    } catch (error) {
        handleError(error, "becaService -> deleteBecaById");
    }
}

module.exports = {
    getBecas,
    createBeca,
    getBecaById,
    deleteBecaById
}