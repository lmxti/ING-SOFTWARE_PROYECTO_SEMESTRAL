"use strict"

const Grant = require("../models/grant.js");
const { handleError } = require("../utils/errorHandler.js");

async function getGrants() {
    try {
        const grant = await Grant.find();
        if (!grant) {
            return [null, "No hay becas en la base de datos"];
        }
        return [grant, null];
    } catch (error) {
        handleError(error, "grantService -> getGrants");
    }
}

async function createGrant(grant) {
    try {
        const { name, requirements, documents, amount } = grant;
        const newGrant = new Grant({
            name,
            requirements,
            documents,
            amount
        });
        await newGrant.save();
        return [newGrant, null];
    } catch (error) {
        handleError(error, "grantService -> createGrant");
    }
}

async function getGrantById(id) {
    try {
        const grant = await Grant.findById(id);
        if (!grant) {
            return [null, "No existe la beca"];
        }
        return [beca, null];
    } catch (error) {
        handleError(error, "grantService -> getGrantById");
    }
}

async function deleteGrantById(id) {
    try {
        const grant = await Grant.findByIdAndDelete(id);
        if (!grant) {
            return [null, "No existe la beca"];
        }
        return [grant, null];
    } catch (error) {
        handleError(error, "grantService -> deleteGrantById");
    }
}

module.exports = {
    getGrants,
    createGrant,
    getGrantById,
    deleteGrantById
}