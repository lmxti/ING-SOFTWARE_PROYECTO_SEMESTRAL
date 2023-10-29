const Application = require('../models/application.model.js');
const { handleError } = require('../utils/errorHandler.js');
const Person = require('../models/person.model.js');
const Grant = require('../models/grant.model.js');

async function createApplication(application) {
    try {
        const { person, grant, documents } = application;
        // Busqueda de persona
        const personFound = await Person.findById(person).select('-password -role');
        // Si no se encuentra la persona
        if (!personFound) {
            return [null, 'No se encontro la persona'];
        }
        // Si la persona ya tiene una postulacion
        const applicationFound = await Application.findOne({ person: personFound._id });
        if (applicationFound) {
            return [null, 'La persona ya tiene una postulacion'];
        }
        // Busqueda de beca
        const becaFound = await Grant.findById(grant);
        // Si no se encuentra la beca
        if (!becaFound) {
            return [null, 'No se encontro la beca'];
        }
        // Destructuracion y creacion de nueva postulacion de beca
        const newApplication = new Application({
            person,
            grant,
            documents,
        });
        // Guardado de postulacion de beca
        const applicationCreated = await newApplication.save();
        const applicationPersonInfo ={
            ...applicationCreated._doc,
            person: personFound,
        }
        // Retorno de datos
        return [applicationPersonInfo, null];
    } catch (error) {
        handleError(error, 'application.service -> createApplication');
    }
}

async function getApplications() {
    try {
        const applications = await Application.find().populate('person', '-password -_id -role').populate('grant', '-_id -state -__v');
        return [applications, null];
    } catch (error) {
        handleError(error, 'application.service -> getApplications');
    }
}

async function updateApplication(application) {
    try{
        const { person_id, grant_id, documents } = application;
        // Busqueda de persona
        const personFound = await Person.findById(person_id);
        // Si no se encuentra la persona
        if (!personFound) {
            return [null, 'No se encontro la persona'];
        }
        // Busqueda de beca
        const becaFound = await Grant.findById(grant_id);
        // Si no se encuentra la beca
        if (!becaFound) {
            return [null, 'No se encontro la beca'];
        }
        // Actualizacion de postulacion
        const applicationUpdated = await Application.findOneAndUpdate({ person: person_id }, { grant: grant_id, documents }, { new: true }).populate('person', '-password -_id -role').populate('grant', '-_id -state -__v');
        // Retorno de datos
        return [applicationUpdated, null];
    }catch(error){
        handleError(error, 'application.service -> updateApplication');
    }
}

module.exports = {
    createApplication,
    getApplications,
    updateApplication,
}