const Appeal = require("../models/appeal.model");
const { handleError, respondError } = require("../utils/utils.js");


// crear una nueva apelacion
async function createAppeal(appeal) {
    try {
        const { user, reason, attachments } = appeal;
        const appealFound = await Appeal.findOne({ user: user });
        if (appealFound) return [null,`Ya existe una apelacion para el usuario ${user}`];
        const newAppeal = new Appeal({
            user,
            reason,
            attachments,
        });
        await newAppeal.save();
        return [newAppeal, null];
    } catch (error) {
        handleError(error, "appeal.service -> createAppeal");
    }
}

// obtener todas las apelaciones
async function getAppeals() {
    try {
        const appeals = await Appeal.find().exec();
        if (!appeals) {
            return [null, "No se encontraron apelaciones"];
        }
        return [appeals, null];
    } catch (error) {
        handleError(error, "appeal.service -> getAppeals");
    }
}

// obtener una apelacion por id
async function getAppealById(id) {
    try {
        const appeal = await Appeal.findById(id).exec();
        if (!appeal) {
            return [null, "No se encontro la apelacion"];
        }
        return [appeal, null];
    } catch (error) {
        handleError(error, "appeal.service -> getAppealById");
    }
}

// actualizar el estado de una apelacion
async function updateAppeal(id, appeal){
    try {
        const { status } = appeal;
        const appealFound = await Appeal.findById(id);
        if (!appealFound) {
            return [null, "No se encontro la apelacion"];
        }
        appealFound.status = status;
        await appealFound.save();
        return [appealFound, null];
    } catch (error) {
        handleError(error, "appeal.service -> updateAppeal");
    }
}

module.exports = {
    createAppeal,
    getAppeals,
    getAppealById,
    updateAppeal,
};