const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");
const PersonWithGrantsService = require('../services/personWithGrants.service');

async function getPersonsWithGrants(req, res) {
    try {
        const [personsWithGrants, personWithGrantsErrors] = await PersonWithGrantsService.getPersonGrants();
        if (personWithGrantsErrors) {
            return respondError(req, res, 400, personWithGrantsErrors);
        }

        personsWithGrants.length === 0
            ? respondSuccess(req, res, 400, "No se encontraron personas con becas aceptadas")
            : respondSuccess(req, res, 200, personsWithGrants);
    } catch (error) {
        handleError(error, "personWithGrants.controller -> getPersonsWithGrants");
    }
}


module.exports = {
    getPersonsWithGrants,
}