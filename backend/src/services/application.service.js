const Application = require('../models/application.model.js');
const { handleError } = require('../utils/errorHandler.js');
const Person = require('../models/person.model.js');
const Grant = require('../models/grant.model.js');

async function createApplication(email, solicitudData) {
    try {
        const person = await Person.findOne({ email });
        if (!person) {
          return [null, "No se encontro la persona autenticada"];
        }
        if (person.name !== solicitudData.person.name) {
          return [
            null,
            "El nombre de la persona no coincide con el de la persona autenticada",
          ];
        }
        if (person.surname !== solicitudData.person.surname) {
          return [
            null,
            "El apellido de la persona no coincide con el de la persona autenticada",
          ];
        }
        if (person.rut !== solicitudData.person.rut) {
          return [
            null,
            "El rut de la persona no coincide con el de la persona autenticada",
          ];
        }
        if (person.gender !== solicitudData.person.gender) {
          return [
            null,
            "El genero de la persona no coincide con el de la persona autenticada",
          ];
        }
        if (person.address !== solicitudData.person.address) {
          return [
            null,
            "La direccion de la persona no coincide con la de la persona autenticada",
          ];
        }
        if (person.phone !== solicitudData.person.phone) {
          return [
            null,
            "El telefono de la persona no coincide con el de la persona autenticada",
          ];
        }
        if (person.email !== solicitudData.person.email) {
          return [null, "El correo no coincide con el de la persona autenticada"];
        }
        const grant = await Grant.findOne({ name: solicitudData.grant });
        if (!grant) {
          return [null, "No se encontro la beca"];
        }
        const solicitudFound = await Application.findOne({
          "person.email": solicitudData.person.email,
        });
        if (solicitudFound) {
          return [null, "Ya existe una solicitud de beca para esta persona"];
        }
        const newApplication = new Application({
          person: {
            name: solicitudData.person.name,
            surname: solicitudData.person.surname,
            rut: solicitudData.person.rut,
            gender: solicitudData.person.gender,
            address: solicitudData.person.address,
            phone: solicitudData.person.phone,
            email: solicitudData.person.email,
          },
          grant: grant,
          state: solicitudData.state,
        });
        await newApplication.save();
        return [newApplication, null];
      } catch (error) {
        handleError(error, "solicitudService -> createSolicitud");
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

async function deleteApplication(application){
    try{
        // Eliminacion de postulacion
        const applicationDeleted = await Application.findOneAndDelete(application);
        // Retorno de datos
        return [applicationDeleted, null];
    }catch(error){
        handleError(error, 'application.service -> deleteApplication');
    }
}

async function getApplicationById(application){
    try{
        // Busqueda de postulacion
        const applicationFound = await Application.findById(application).populate('person', '-password -_id -role').populate('grant', '-_id -state -__v');
        // Retorno de datos
        return [applicationFound, null];
    }catch(error){
        handleError(error, 'application.service -> getApplicationById');
    }
}

module.exports = {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication,
    getApplicationById
}