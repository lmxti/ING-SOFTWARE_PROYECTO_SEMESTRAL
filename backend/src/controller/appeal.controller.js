const Appeal = require("../models/appeal.model.js");


//controlador para crear una nueva apelacion
async function createAppeal(req, res) {
    try {
        const { reason } = req.body;
        

        const appeal = new Appeal({
            reason,
        });
        await appeal.save();
        res.status(201).json(appeal);
    } catch (error) {
        handleError(error, "appeal.controller -> createAppeal");
        respondError(req, res, 500, "No se creo la apelacion");
    }
}

//controlador para obtener todas las apelaciones
async function getAppeals(req, res) {
    try {
        const appeals = await Appeal.find();
        res.json(appeals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//controlador para obtener una apelacion por id
async function getAppealById(req, res) {
    try {
        const appeal = await Appeal.findById(req.params.id);
        if (!appeal) {
            return res.status(404).json({ message: "No se encontro la apelacion" });
        }
        res.status(200).json(appeal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//controlador para actualizar el estado de una apelacion por id
async function updateAppealById(req, res) {
    try {
        const { status } = req.body;
        const appeal = await Appeal.findById(req.params.id);
        if (!appeal) {
            return res.status(404).json({ message: "No se encontro la apelacion" });
        }
        appeal.status = status;
        await appeal.save();
        res.status(200).json(appeal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//controlador para eliminar una apelacion por id
async function deleteAppealById(req, res) {
    try {
        const appeal = await Appeal.findById(req.params.id);
        if (!appeal) {
            return res.status(404).json({ message: "No se encontro la apelacion" });
        }
        await appeal.remove();
        res.status(200).json({ message: "Apelacion eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
