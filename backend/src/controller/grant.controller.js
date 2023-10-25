const { respondSuccess, respondError } = require("../utils/resHandler.js");
const GrantService = require('../services/grant.service.js');
const { handleError } = require("../utils/errorHandler.js");



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

async function createGrant(req, res) {
    try {
        const { body } = req;
        // Validacion de campos de body
        // const { error: bodyError } = grantBodySchema.validate(body);
        // if (bodyError) return respondError(req, res, 400, bodyError.message);

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
    } catch(error) {
        handleError(error, "grant.controller -> createGrant");
        respondError(req, res, 400, error.message);
    }
}


module.exports = {
    getGrants,
    createGrant
}