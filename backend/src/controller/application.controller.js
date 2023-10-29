const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

const ApplicationService = require("../services/application.service.js");
const { applicationBodySchema } = require("../schema/application.schema.js");

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

async function getApplications(req, res){
    try {
        const [applications, applicationError] = await ApplicationService.getApplications();
        // Si ocurre un error
        if (applicationError) {
            return respondError(req, res, 400, applicationError);
        }
        // Si no se obtienen las postulaciones
        if (!applications) {
            return respondError(req, res, 400, "No se obtuvieron las solicitudes");
        }
        respondSuccess(req, res, 200, {
            message: "Solicitudes obtenidas con exito",
            data: applications
        });
    } catch (error) {
        handleError(error, "application.controller -> getApplications");
    }
}

async function updateApplication(req, res){
    try {
        // Destructuracion de datos de la postulacion
        const { body } = req;
        const [updatedApplication, applicationError] = await ApplicationService.updateApplication(body);
        // Si ocurre un error
        if (applicationError) {
            return respondError(req, res, 400, applicationError);
        }
        // Si no se crea la postulacion
        if (!updatedApplication) {
            return respondError(req, res, 400, "No se actualizo la solicitud");
        }
        respondSuccess(req, res, 201, {
            message: "Solicitud actualizada con exito",
            data: updatedApplication
        });
    } catch (error) {
        handleError(error, "application.controller -> updateApplication");
    }
}

module.exports = {
    createApplication,
    getApplications,
    updateApplication
}