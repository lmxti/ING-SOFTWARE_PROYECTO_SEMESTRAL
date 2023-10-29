const { respondSuccess, respondError } = require("../utils/resHandler.js");
const GrantService = require('../services/grant.service.js');
const { handleError } = require("../utils/errorHandler.js");
const { grantBodySchema } = require("../schema/grant.schema.js");

const Person = require('../models/person.model.js');
const NodeMailer = require('../services/nodemailer.service.js');

// <----------------------------- Obtener todas las becas ----------------------------->
/**
 * Obtiene todas las becas de la base de datos
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 */
async function getGrants(req, res) {
    try {
        // Obtencion de todas las becas en la BD
        const [grants, errorGrants] = await GrantService.getGrants();
        // Verificacion de errores
        if (errorGrants) {
            return respondError(
                res,
                500,
                "Error al obtener las becas",
                errorGrants
            );
        }
        grants.length === 0
            ? respondSuccess(req, res, 200, "No hay becas registradas")
            : respondSuccess(req, res, 200, {
                message: "Becas obtenidas con exito",
                data: grants,
            });
    } catch(error) {
        handleError(error, "grant.controller -> getGrants");
        respondError(req, res, 400, error.message);
    }
}

async function getGrantById(req, res) {
    try {
        const { id } = req.params;
        const [grant, errorGrant] = await GrantService.getGrantById(id);
        if (errorGrant) return respondError(req, res, 400, errorGrant);
        if (!grant) return respondError(req, res, 400, "No se encontró la beca");
        respondSuccess(req, res, 200, {
            message: "Beca obtenida con exito",
            data: grant,
        });
    } catch(error) {
        handleError(error, "grant.controller -> getGrantById");
        respondError(req, res, 400, error.message);
    }
}

async function createGrant(req, res) {
    try {
        const { body } = req;
        // Validacion de campos de body
        const { error: bodyError } = grantBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newGrant, grantError] = await GrantService.createGrant(body);
        // Error de createGrant
        if (grantError) return respondError(req, res, 400, grantError);
        // Error si no hay datos (false)
        if (!newGrant) return respondError(req, res, 400, "No se pudo crear la beca");
        // Respuesta exitosa
        respondSuccess(req, res, 201, {
            message: "Beca creada con exito",
            data: newGrant,
        });

        const [allGrants, errorGrants] = await GrantService.getGrants();
        if (errorGrants) {
            return respondError(
                res,
                500,
                "Error al obtener las becas",
                errorGrants
            );
        }

        // Notificacion a todas las personas del sistema sobre la nueva beca creada + las becas existentes
        Person.find({})
        .then((persons) => {
            if (!persons || persons.length === 0) {
            return respondError(req, res, 404, "No se encontraron usuarios");
            }
            persons.forEach((user) => {
                let nameUser = user["name"];
                let emailUser = user["email"];
                let message = `Hola ${nameUser}, se ha creado una nueva beca ${body.name}. Aquí están todas las becas disponibles:\n`;

                allGrants.forEach((grant) => {
                    message += `- ${grant.name} - Monto: ${grant.amount}\n`;
                });
                NodeMailer.enviarEmail(emailUser, "Nueva beca creada", message);
            });
        })
        .catch((error) => {
            console.error("Error al obtener los usuarios:", error);
            return respondError(req, res, 500, "Error al obtener los usuarios");
        });


    } catch(error) {
        handleError(error, "grant.controller -> createGrant");
        respondError(req, res, 400, error.message);
    }
}

async function updateGrantById(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        // Validacion de campos de body
        const { error: bodyError } = grantBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [grantUpdated, grantError] = await GrantService.updateGrant(id, body);
        // Error de updateGrant
        if (grantError) return respondError(req, res, 400, grantError);
        // Error si no hay datos (false)
        if (!grantUpdated) return respondError(req, res, 400, "No se pudo actualizar la beca");
        // Respuesta exitosa
        respondSuccess(req, res, 200, {
            message: "Beca actualizada con exito",
            data: grantUpdated,
        });
    } catch(error) {
        handleError(error, "grant.controller -> updateGrant");
        respondError(req, res, 400, error.message);
    }
}

async function deleteGrantById(req, res){
    try {
        const { id } = req.params;
        // Validar id en el schema de grant
        // const {error: paramsError} = grantIdSchema.validate(id);

        const grant = await GrantService.deleteGrantById(id);
        !grant
            ? respondError(req, res, 400, "No se encontró la beca", "Verifique el 'id' ingresado")
            : respondSuccess(req, res, 200, {
                message: "Beca eliminada con exito",
                data: grant,
            });
    } catch (error) {
        handleError(error, "grant.controller -> deleteGrantById");
        respondError(req, res, 400, error.message);
    }
    
}

async function desactivateGrantById(req, res){
    try {
        const { id } = req.params;
        // Validar id en el schema de grant
        // const {error: paramsError} = grantIdSchema.validate(id);
        const grant = await GrantService.desactivateGrantById(id);
        !grant
            ? respondError(req, res, 400, "No se encontró la beca", "Verifique el 'id' ingresado")
            : respondSuccess(req, res, 200, {
                message: "Beca desactivada con exito",
                data: grant,
            });
    } catch (error) {
        handleError(error, "grant.controller -> desactivateGrantById");
        respondError(req, res, 400, error.message);
    }
}


module.exports = {
    createGrant,
    getGrants,
    getGrantById,
    updateGrantById,
    deleteGrantById,
    desactivateGrantById
}