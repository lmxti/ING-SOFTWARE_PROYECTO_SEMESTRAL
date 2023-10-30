// <----------------- MODELOS IMPORTADOS ----------------------->
// Modelo de "person" (usuarios)
const Person = require('../models/person.model.js');
// <---------------- SCHEMAS DE VALIDACION --------------------->
// Schema de validacion de datos de "Grant" (beca)
const { grantBodySchema } = require("../schema/grant.schema.js");
// <---------------- SERVICIOS IMPORTADOS ---------------------->
// Servicios de "Grant" (beca)
const GrantService = require('../services/grant.service.js');
// Servicio de envio de correos electronicos
const NodeMailer = require('../services/nodemailer.service.js');
// <--------------------- UTILIDADES --------------------------->
// Respuestas estandarizadas
const { respondSuccess, respondError } = require("../utils/resHandler.js");
// Manejador de errores
const { handleError } = require("../utils/errorHandler.js");


// <-------------------------------------------------------------------->
/**
 * @name createGrant
 * @description Crea una nueva beca
 * @param {Object} req - Objeto de solicitud con los datos de la beca a crear
 * @param {Object} res - Objeto de respuesta con la beca creada
 */
async function createGrant(req, res) {
    try {
        // Desestructuracion de datos de la solicitud
        const { body } = req;
        // Validacion de campos de body
        const { error: bodyError } = grantBodySchema.validate(body);
        // Si existen errores en los campos de body
        if (bodyError){
            return respondError(req, res, 400, bodyError.message);
        }
        // Servicio de creacion de beca
        const [newGrant, grantError] = await GrantService.createGrant(body);
        // Si hay un error al crear la beca
        if (grantError) return respondError(req, res, 400, grantError);
        // Si no hay datos de creacion (false)
        if (!newGrant) return respondError(req, res, 400, "No se pudo crear la beca");
        // Respuesta exitosa
        respondSuccess(req, res, 201, {
            message: "Beca creada con exito",
            data: newGrant,
        });

        // Obtencion de becas en la base de datos
        const [allGrants, errorGrants] = await GrantService.getGrants();
        if (errorGrants) {
            return respondError(
                res,
                500,
                "Error al obtener las becas",
                errorGrants
            );
        }
        // Busqueda de personas (usuarios) en la base de datos
        Person.find({})
        .then((persons) => {
            if (!persons || persons.length === 0) {
            return respondError(req, res, 404, "No se encontraron usuarios");
            }
            // Envio de correo a cada usuario con un listado de las becas disponibles
            persons.forEach((user) => {
                // Datos de usuario a enviar correo
                let nameUser = user["name"];
                let emailUser = user["email"];
                // Mensaje para enviar a usuario
                let message = `Hola ${nameUser}, se ha creado una nueva beca ${body.name}. Aquí están todas las becas disponibles:\n`;
                // Recorrido de becas para agregarlas al mensaje
                allGrants.forEach((grant) => {
                    message += `- ${grant.name} - Monto: ${grant.amount}\n`;
                });
                // Envio de correo a usuario
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

// <-------------------------------------------------------------------->
/**
 * @name getGrants
 * @description Obtiene todas las becas registradas en la base de datos
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 */
async function getGrants(req, res) {
    try {
        const [grants, errorGrants] = await GrantService.getGrants();
        // Si hay un error al obtener las becas
        if (errorGrants) {
            return respondError(
                res,
                500,
                "Error al obtener las becas",
                errorGrants
            );
        }
        // Si no existen becas en la base de datos
        if(grants.length === 0){
            return respondSuccess(req, res, 200, "No hay becas registradas");
        }
        // Si existen becas en la base de datos 
        else {
            respondSuccess(req, res, 200, {
                message: "Becas obtenidas con exito",
                data: grants,
            });
        }
    } catch(error) {
        handleError(error, "grant.controller -> getGrants");
        respondError(req, res, 400, error.message);
    }
}

// <-------------------------------------------------------------------->
/**
 * @name getGrantById
 * @description Obtiene una beca a traves de un id
 * @param {Object} req - Objeto de solicitud con "id" de la beca a obtener
 * @param {Object} res - Objeto de respuesta con la beca solicitada
 */
async function getGrantById(req, res) {
    try {
        // Desestructuracion de datos (id) de la solicitud
        const { id } = req.params;
        // Servicio de obtencion de beca por id
        const [grant, errorGrant] = await GrantService.getGrantById(id);
        // Si hay un error al obtener la beca
        if (errorGrant){
            return respondError(req, res, 400, errorGrant);
        }
        // Si no existe la beca
        if (!grant){
            return respondError(req, res, 400, "No se encontró la beca");
        }
        // Respuesta exitosa
        respondSuccess(req, res, 200, {
            message: "Beca obtenida con exito",
            data: grant,
        });
    } catch(error) {
        handleError(error, "grant.controller -> getGrantById");
        respondError(req, res, 400, error.message);
    }
}

// <-------------------------------------------------------------------->

/**
 * @name updateGrantById
 * @description Actualiza una beca a traves de un id
 * @param {Object} req - Objeto de solicitud con los datos de la beca a actualizar
 * @param {Object} res - Objeto de respuesta con la beca actualizada
 * @returns 
 */
async function updateGrantById(req, res) {
    try {
        // Desestructuracion de datos (id) de la solicitud
        const { id } = req.params;
        // Desestructuracion de datos de la solicitud
        const { body } = req;
        // Validacion de campos de datos de body
        const { error: bodyError } = grantBodySchema.validate(body);
        // Si existen errores en los campos de body
        if (bodyError) return respondError(req, res, 400, bodyError.message);
        // Servicio de actualizacion de beca
        const [grantUpdated, grantError] = await GrantService.updateGrant(id, body);
        // Si hay un error al actualizar la beca
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

// <-------------------------------------------------------------------->

/**
 * @name deleteGrantById
 * @description Elimina una beca a traves de un id
 * @param {Object} req - Objeto de solicitud con el "id" de la beca a eliminar
 * @param {Object} res - Objeto de respuesta con la beca eliminada 
 */
async function deleteGrantById(req, res){
    try {
        // Desestructuracion de datos (id) de la solicitud
        const { id } = req.params;
        // Servicio de eliminacion de beca
        const grant = await GrantService.deleteGrantById(id);
        !grant
        // Si la beca no existe o no se encontro
            ? respondError(req, res, 400, "No se encontró la beca", "Verifique el 'id' ingresado")
        // Si la beca existe y se elimino con exito 
            : respondSuccess(req, res, 200, {
                message: "Beca eliminada con exito",
                data: grant,
            });
    } catch (error) {
        handleError(error, "grant.controller -> deleteGrantById");
        respondError(req, res, 400, error.message);
    }
    
}

// <-------------------------------------------------------------------->

/**
 * @name desactivateGrantById
 * @description Desactiva una beca a traves de un id
 * @param {Object} req - Objeto de solicitud con el "id" de la beca a desactivar 
 * @param {Object} res - Objeto de respuesta con la beca desactivada
 */
async function desactivateGrantById(req, res){
    try {
        // Desestructuracion de datos (id) de la solicitud
        const { id } = req.params;
        // Servicio de desactivacion de beca
        const grant = await GrantService.desactivateGrantById(id);

        !grant
        // Si la beca no existe o no se encontro
            ? respondError(req, res, 400, "No se encontró la beca", "Verifique el 'id' ingresado")
        // Si la beca existe y se desactivo con exito
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