//Se declaran las funciones de manejos de errores
const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");
//Se declara el servicio que llevara a cabo cada proceso de Solicitud
const SolicitudService = require("../services/solicitudService.js");
//Se declara el esquema de Solicitud para la validacion de datos
const {
  solicitudBodySchema,
  solicitudIdSchema,
} = require("../schema/solicitudSchema.js");

//Obtener todas las solicitudes
async function getSolicitudes(req, res) {
  try {
    const [solicitudes, solicitudesError] =
      await SolicitudService.getSolicitudes();
    if (solicitudesError) {
      return respondError(req, res, 400, solicitudesError);
    }
    solicitudes.length === 0
      ? respondSuccess(req, res, 200, "No hay solicitudes registradas")
      : respondSuccess(req, res, 200, solicitudes);
  } catch (error) {
    handleError(error, "solicitudController -> getSolicitudes");
    respondError(req, res, 400, error.message);
  }
}

//Obtener una solicitud
async function getSolicitud(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = solicitudIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }
    const {id} = params;
    const [solicitud, solicitudError] = await SolicitudService.getSolicitud(
      id
    );
    if (solicitudError) {
      return respondError(req, res, 400, solicitudError);
    }
    if (!solicitud) {
      return respondError(req, res, 400, "No se pudo obtener la solicitud");
    }
    respondSuccess(req, res, 200, solicitud);
  } catch (error) {
    handleError(error, "solicitudController -> getSolicitud");
    respondError(req, res, 400, "No se pudo obtener la solicitud");
  }
}

//Crear una solicitud
async function createSolicitud(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = solicitudBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }
    const [newSolicitud, solicitudError] =
      await SolicitudService.createSolicitud(body);
    if (solicitudError) {
      return respondError(req, res, 400, solicitudError);
    }
    if (!newSolicitud) {
      return respondError(req, res, 400, "No se pudo crear la solicitud");
    }
    respondSuccess(req, res, 201, newSolicitud);
  } catch (error) {
    handleError(error, "solicitudController -> createSolicitud");
    respondError(req, res, 400, error.message);
  }
}

//Eliminar solicitud
async function deleteSolicitud(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = solicitudIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }
    const [solicitud, solicitudError] = await SolicitudService.deleteSolicitud(
      params.id
    );
    if (solicitudError) {
      return respondError(req, res, 400, solicitudError);
    }
    if (!solicitud) {
      return respondError(req, res, 400, "No se pudo eliminar la solicitud");
    }
    respondSuccess(req, res, 200, "Solicitud eliminada");
  } catch (error) {
    handleError(error, "solicitudController -> deleteSolicitud");
    respondError(req, res, 400, error.message);
  }
}

//Actualizar solicitud
async function updateSolicitud(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = solicitudIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }
    const { error: bodyError } = solicitudBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }
    const [solicitud, solicitudError] = await SolicitudService.updateSolicitud(
      params.id,
      body
    );
    if (solicitudError) {
      return respondError(req, res, 400, solicitudError);
    }
    if (!solicitud) {
      return respondError(req, res, 400, "No se pudo actualizar la solicitud");
    }
    respondSuccess(req, res, 200, solicitud);
  } catch (error) {
    handleError(error, "solicitudController -> updateSolicitud");
    respondError(req, res, 400, error.message);
  }
}

module.exports = {
  createSolicitud,
  getSolicitudes,
  deleteSolicitud,
  updateSolicitud,
  getSolicitud
};
