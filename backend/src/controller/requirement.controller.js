const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

const RequirementService = require('../services/requirement.service.js');

async function getRequirements(req, res) {
    try {
        const [requirements, errorRequirements] = await RequirementService.getRequirements();
        if (errorRequirements) {
            return res.status(400).json({ message: errorRequirements });
        }
        if(requirements.length === 0){
            return respondSuccess(res, "No hay requisitos en la base de datos");
        }
        else{
            respondSuccess(req, res, 200, {
                message: "Requisitos encontrados",
                requirements: requirements
            })
        }
    } catch (error) {
        handleError(error, "requirement.controller -> getRequirements");
        respondError(req, res, 500, "Error del servidor");
    }
}

module.exports = {
    getRequirements
}