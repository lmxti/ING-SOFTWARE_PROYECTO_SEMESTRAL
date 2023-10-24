const {respondSuccess, respondError} = require('../utils/resHandler.js');
const SolicitudService = require('../services/solicitudService.js');
const {solicitudBodySchema, solicitudIdSchema} = require('../schema/solicitudSchema.js');
const {handleError} = require('../utils/errorHandler.js');

// Crear una solicitud
async function createSolicitud(req, res) {
    try{
        const {body} = req;
        const {error: bodyError} = solicitudBodySchema.validate(body);
        if(bodyError){
            return respondError(req, res, 400, bodyError.message);
        }
        const [newSolicitud, solicitudError] = await SolicitudService.createSolicitud(body);
        if(solicitudError){
            return respondError(req, res, 400, solicitudError);
        }
        if(!newSolicitud){
            return respondError(req, res, 400, 'No se pudo crear la solicitud');
        }
        respondSuccess(req, res, 201, newSolicitud);
    }catch(error){
        handleError(error, 'solicitudController -> createSolicitud');
        respondError(req, res, 400, error.message);
    }
}

// Obtener todas las solicitudes
async function getSolicitudes(req, res) {
    try{
        const [solicitudes, solicitudesError] = await SolicitudService.getSolicitudes();
        if(solicitudesError){
            return respondError(req, res, 400, solicitudesError);
        }
        solicitudes.length === 0
            ? respondSuccess(req, res, 200, 'No hay solicitudes registradas')
            : respondSuccess(req, res, 200, solicitudes);
    }catch(error){
        handleError(error, 'solicitudController -> getSolicitudes');
        respondError(req, res, 400, error.message);
    }
}

module.exports = {
    createSolicitud,
    getSolicitudes
};