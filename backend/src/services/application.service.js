const { handleError } = require('../utils/errorHandler.js');
const Application = require('../models/application.model.js');
const Person = require('../models/person.model.js');
const Grant = require('../models/grant.model.js');
const PersonWithGrant = require('../models/personWithGrants.js');

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

async function updateApplication(id, updateFields) {
    try{
        // Actualizacion de postulacion
        const application = await Application.findById(id);

        if(!application){
            return [null, 'No se encontro la postulacion'];
        }

        Object.assign(application, updateFields);
        const updatedApplication = await application.save();

        if(updateFields.status === 'Aceptado'){
          createPersonWithGrant(application.person.email, application.grant);
        }

        return [updatedApplication, null];
    }catch(error){
        handleError(error, 'application.service -> updateApplication');
    }
}

async function createPersonWithGrant(person_email, grant_id) {
  try {
    // Buscar persona por email
    const PersonFound = await Person.findOne({ email: person_email });

    // Verificar si ya existe un registro para la persona y la beca
    const existingRecord = await PersonWithGrant.findOne({
      person: PersonFound._id,
      grant: grant_id,
    });

    if (!existingRecord) {
      // Crear el nuevo registro solo si no existe
      await new PersonWithGrant({
        person: PersonFound._id,
        grant: grant_id,
      }).save();
    }
  } catch (error) {
    handleError(error, 'application.service -> createPersonWithGrant');
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


// Busqueda de postulacion por id de persona (Se debe ajustar el modelo de postulacion(application) para usarlo)
async function getApplicationByIdPerson(idPerson){
    try{
        // Busqueda de postulacion
        const applicationFound = await Application.findOne({"person._id": idPerson}).populate('person', '-password -_id -role').populate('grant', '-_id -state -__v');
        // Retorno de datos

        console.log("xd",applicationFound);

        return [applicationFound, null];
    }catch(error){
        handleError(error, 'application.service -> getApplicationByIdPerson');
    }
}




module.exports = {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication,
    getApplicationById,
    getApplicationByIdPerson
}