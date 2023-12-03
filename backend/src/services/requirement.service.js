const { handleError } = require("../utils/errorHandler.js");

const Requirement = require('../models/requirement.model');

async function getRequirements() {
    try{
       const requirements = await Requirement.find();
       if (!requirements) {
            return [null, "No hay requisitos en la base de datos"];
        }
        return [requirements, null]
    } catch(error) {
        handleError(error, "requirement.service -> getRequirements");
    }
}

module.exports = {
    getRequirements
}

