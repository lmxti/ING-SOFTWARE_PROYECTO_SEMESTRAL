const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

const ApplicationService = require("../services/application.service.js");
// const { applicationBodySchema } = require("../schema/application.schema.js");

async function createApplication(req, res){
    try {
        // Destructuracion de datos de la postulacion
        const { body } = req;
        const [newApplication, applicationError] = await ApplicationService.createApplication(body);
        // Si ocurre un error
        if (applicationError) {
            return respondError(req, res, 400, applicationError);
        }
        // Si no se crea la postulacion
        if (!newApplication) {
            return respondError(req, res, 400, "No se creo la solicitud");
        }
        respondSuccess(req, res, 201, {
            message: "Solicitud creada con exito",
            data: newApplication
        });
    } catch (error) {
        handleError(error, "application.controller -> createApplication");
    }
}

module.exports = { createApplication }