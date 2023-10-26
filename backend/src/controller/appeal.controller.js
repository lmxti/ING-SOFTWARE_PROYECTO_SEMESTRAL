const { respondSuccess, respondError } = require("../utils/resHandler.js");
const AppealService = require("../services/appeal.service.js");
const { handleError } = require("../utils/errorHandler.js");
const { appealBodySchema } = require("../schema/appeal.schema.js");


//controlador para crear una nueva apelacion
async function createAppeal(req, res) {
    try {
        const { body } = req;
        // Validacion de datos
        const { error: bodyError } = appealBodySchema.validate(body);
        if (bodyError) {
            return respondError(req, res, 400, bodyError.message);
        }
        const [newAppeal, appealError] = await AppealService.createAppeal(body);
        // Verificacion de errores
        if (appealError) {
            return respondError(req, res, 400, appealError);
        }
        // Validacion que newAppeal no sea null
        if (!newAppeal) {
            return respondError(req, res, 400, "No se creo la apelacion");
        }
        respondSuccess(req, res, 201, {
            message: "Apelacion creada con exito",
            data: newAppeal
        });
        NodeMailer.enviarEmail('correo@ejemplo.com', 'nueva apelacion', 'se ha creado una nueva apelacion');
    } catch (error) {
        handleError(error, "appeal.controller -> createAppeal");
        respondError(req, res, 400, error.message);
    }
    // try {
    //     const { user, reason, attachments } = req.body;

    //     const appeal = new Appeal({
    //         user,
    //         reason,
    //         attachments,
    //     });
    //     await appeal.save();
    //     res.status(201).json(appeal);
    // } catch (error) {
    //     handleError(error, "appeal.controller -> createAppeal");
    //     respondError(req, res, 500, "No se creo la apelacion");
    // }
}

//controlador para obtener todas las apelaciones
async function getAppeals(req, res) {
    try {
        // Obtiene todas las apelaciones
        const [appeals, errorAppeals] = await AppealService.getAppeals();
        // Verificacion de errores
        if (errorAppeals) {
            return respondError(res, 500, "Error al obtener las apelaciones", errorAppeals);
        }
        appeals.length === 0
            ? respondSuccess(req, res, 200, "No hay apelaciones registradas")
            : respondSuccess(req, res, 200, "Apelaciones obtenidas con exito", appeals)
    } catch (error) {
        handleError(error, "appeal.controller -> getAppeals");
        respondError(req, res, 400, error.message);
    }
    
    // try {
    //     const appeals = await Appeal.find();
    //     res.json(appeals);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
}   


//controlador para obtener una apelacion por id
async function getAppealById(req, res) {
    try {
        const { id } = req.params;
        // Obtiene una apelacion por id
        const [appeal, errorAppeal] = await AppealService.getAppealById(id);
        // Verificacion de errores
        if (errorAppeal) {
            return respondError(res, 500, "Error al obtener la apelacion", errorAppeal);
        }
        // Validacion que appeal no sea null
        if (!appeal) {
            return respondError(req, res, 400, "No se encontro la apelacion");
        }
        respondSuccess(req, res, 200, "Apelacion obtenida con exito", appeal)
    } catch (error) {
        handleError(error, "appeal.controller -> getAppealById");
        respondError(req, res, 400, error.message);
    }
    
    // try {
    //     const appeal = await Appeal.findById(req.params.id);
    //     if (!appeal) {
    //         return res.status(404).json({ message: "No se encontro la apelacion" });
    //     }
    //     res.status(200).json(appeal);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
}

//controlador para actualizar el estado de una apelacion por id
async function updateAppeal(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        //validacion de campos de body
        const { error: bodyError } = appealBodySchema.validate(body);
        if (bodyError) {
            return respondError(req, res, 400, bodyError.message);
        }
        // Obtiene una apelacion por id
        const [appeal, errorAppeal] = await AppealService.getAppealById(id);
        // Verificacion de errores
        if (errorAppeal) {
            return respondError(res, 500, "Error al obtener la apelacion", errorAppeal);
        }
        // Validacion que appeal no sea null
        if (!appeal) {
            return respondError(req, res, 400, "No se encontro la apelacion");
        }
        // Actualiza el estado de la apelacion
        const [newAppeal, appealError] = await AppealService.updateAppeal(id, body);
        // Verificacion de errores
        if (appealError) {
            return respondError(req, res, 400, appealError);
        }
        // Validacion que newAppeal no sea null
        if (!newAppeal) {
            return respondError(req, res, 400, "No se actualizo la apelacion");
        }
        respondSuccess(req, res, 200, {
            message: "Apelacion actualizada con exito",
            data: newAppeal
        });
    } catch (error) {
        handleError(error, "appeal.controller -> updateAppeal");
        respondError(req, res, 400, error.message);
    }
    // try {
    //     const { status } = req.body;
    //     const appeal = await Appeal.findById(req.params.id);
    //     if (!appeal) {
    //         return res.status(404).json({ message: "No se encontro la apelacion" });
    //     }
    //     appeal.status = status;
    //     await appeal.save();
    //     res.status(200).json(appeal);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
}

//controlador para eliminar una apelacion por id
async function deleteAppealById(req, res) {
    try {
        const { id } = req.params;

        const appeal = await AppealService.deleteAppealById(id);
        !appeal
            ? respondError(req, res, 400, "No se elimino la apelacion")
            : respondSuccess(req, res, 200, {
                message: "Apelacion eliminada con exito",
                data: appeal
            });
    } catch (error) {
        handleError(error, "appeal.controller -> deleteAppealById");
        respondError(req, res, 400, error.message);
    }
    // try {
    //     const appeal = await Appeal.findById(req.params.id);
    //     if (!appeal) {
    //         return res.status(404).json({ message: "No se encontro la apelacion" });
    //     }
    //     await appeal.remove();
    //     res.status(200).json({ message: "Apelacion eliminada" });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
}

module.exports = {
    createAppeal,
    getAppeals,
    getAppealById,
    updateAppeal,
    deleteAppealById,
};
