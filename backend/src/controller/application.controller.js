const { respondSuccess, respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");
const ApplicationService = require("../services/application.service.js");
// const { applicationBodySchema } = require("../schema/application.schema.js");

async function createApplication(req, res) {
  try {
    const { email } = req;
    const solicitudData = req.body;
    const [newApplication, applicationError] =
      await ApplicationService.createApplication(email, solicitudData);
    if (applicationError) {
      return respondError(req, res, 400, applicationError);
    }
    if (!newApplication) {
      return respondError(req, res, 400, "No se pudo crear la solicitud");
    }
    respondSuccess(req, res, 200, newApplication);
  } catch (error) {
    handleError(error, "solicitudController -> createSolicitud");
    respondError(req, res, 400, error.message);
  }
}

async function getApplications(req, res) {
  try {
    const [applications, applicationError] = await ApplicationService.getApplications();
    // Si ocurre un error
    if (applicationError) {
      return respondError(req, res, 400, applicationError);
    }
    // Si no se obtienen las postulaciones
    applications.length === 0
      ? respondSuccess(req, res, 400, "No se encontraron solicitudes")
      : respondSuccess(req, res, 200, applications);
  } catch (error) {
    handleError(error, "application.controller -> getApplications");
  }
}

async function updateApplication(req, res) {
  const { id } = req.params;
  const updateFields = req.body;
  try {
    // Destructuracion de datos de la postulacion
    const [updatedApplication, applicationError] = await ApplicationService.updateApplication(id, updateFields);
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
      data: updatedApplication,
    });
  } catch (error) {
    handleError(error, "application.controller -> updateApplication");
  }
}

async function deleteApplication(req, res) {
  try {
    // Destructuracion de datos de la postulacion
    const { body } = req;
    const [deletedApplication, applicationError] =
      await ApplicationService.deleteApplication(body.id);
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
      data: deletedApplication,
    });
  } catch (error) {
    handleError(error, "application.controller -> deleteApplication");
  }
}

async function getApplicationById(req, res) {
  try {
    const { params } = req;
    const { id } = params;
    const [application, applicationError] =
      await ApplicationService.getApplicationById(id);
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
      data: application,
    });
  } catch (error) {
    handleError(error, "application.controller -> getApplicationById");
  }
}


// Funcion para encontrar la solicitud de beca por el id de la persona
async function getApplicationPersonID(req, res) {
  try {
    const { params } = req;
    const { id } = params;
    console.log("id de la persona: ", id);
    const [application, applicationError] =await ApplicationService.getApplicationByIdPerson(id);
    // Si ocurre un error
    if (applicationError) {
      return respondError(req, res, 400, applicationError);
    }
    // Si no se encuentra la solicitud
    if (!application) {
      return respondError(req, res, 400, "No se encontro la solicitud");
    }
    respondSuccess(req, res, 200, application);
  } catch (error) {
    
  }    
}


module.exports = {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
  getApplicationById,
  getApplicationPersonID,
};
