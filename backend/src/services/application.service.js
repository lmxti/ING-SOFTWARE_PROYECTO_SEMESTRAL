const Application = require('../models/application.model.js');
const { handleError } = require('../utils/errorHandler.js');

async function createApplication(application) {
    try {
        const { person, beca, documents } = application;
        // Destructuracion y creacion de nueva postulacion de beca
        const newApplication = new Application({
            person,
            beca,
            documents,
        });
        // Guardado de postulacion de beca
        const applicationCreated = await newApplication.save();
        // Retorno de datos
        return [applicationCreated, null];
    } catch (error) {
        handleError(error, 'application.service -> createApplication');
    }
}

module.exports = { createApplication}