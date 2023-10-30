const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

const Person = require("../models/person.model.js");
const Grant = require("../models/grant.model.js");
const ApplicationService = require("../services/application.service.js");
// const { applicationBodySchema } = require("../schema/application.schema.js");

async function createApplication(req, res){
    try {
        // Destructuracion de datos de la postulacion
        const { body } = req;
        const { person, grant, documents } = body;
        // Busqueda de persona
        const personFound = await Person.findOne({name: person});
        // Si no se encuentra la persona
        if (!personFound) {
            return respondError(req, res, 400, "No se encontro la persona");
        }
        body.person = personFound._id;
        // Busqueda de beca
        const grantFound = await Grant.findOne({name: grant});
        // Si no se encuentra la beca
        if (!grantFound) {
            return respondError(req, res, 400, "No se encontro la beca");
        }
        body.grant = grantFound._id;
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

async function deleteApplication(req, res){
    try {
        // Destructuracion de datos de la postulacion
        const { body } = req;
        const [deletedApplication, applicationError] = await ApplicationService.deleteApplication(body.id);
        // Si ocurre un error
        if (applicationError) {
            return respondError(req, res, 400, applicationError);
        }
        // Si no se elimina la solicitud
        if (!deletedApplication) {
            return respondError(req, res, 400, "No se elimino la solicitud");
        }
        respondSuccess(req, res, 201, {
            message: "Solicitud eliminada con exito",
            data: deletedApplication
        });
    } catch (error) {
        handleError(error, "application.controller -> deleteApplication");
    }
}

async function getApplicationById(req,res){
    try{
        const { params } = req;
        const { id } = params;
        const [application, applicationError] = await ApplicationService.getApplicationById(id);
        // Si ocurre un error
        if (applicationError) {
            return respondError(req, res, 400, applicationError);
        }
        // Si no se elimina la solicitud
        if (!application) {
            return respondError(req, res, 400, "No se encontro la solicitud");
        }
        respondSuccess(req, res, 201, {
            message: "Solicitud encontrada con exito",
            data: application
        });
    }catch(error){
        handleError(error, "application.controller -> getApplicationById");
    }
}

module.exports = {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication,
    getApplicationById
}