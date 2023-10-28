"use strict";

const Solicitud = require("../models/solicitud.js");
const { handleError } = require("../utils/errorHandler.js");
const Grant = require("../models/grant.js");
const Person = require("../models/person.js");
const { respondSuccess } = require("../utils/resHandler.js");

async function getSolicitudes() {
    try {
        const solicitudes = await Solicitud.find();
        if (!solicitudes) {
            return [null, "No hay solicitudes en la base de datos"];
        }
        return [solicitudes, null];
    } catch (error) {
        handleError(error, "solicitudService -> getSolicitudes");
    }
}

async function getSolicitud(solicitudId) {
    try{
        const solicitud = await Solicitud.findById(solicitudId);
        if(!solicitud){
            return [null, 'No existe la solicitud'];
        }
        const solicitante = await Person.findById(solicitud.person).select('-password -role -_id');
        if(!solicitante){
            return [null, 'No existe el solicitante'];
        }
        const beca = await Grant.findById(solicitud.grant).select('-_id');
        if(!beca){
            return [null, 'No existe la beca'];
        }
        const solicitudDetails = {
            solicitud,
            solicitante,
            beca
        }
        return [solicitudDetails, null];
    }catch(error){
        handleError(error, 'solicitudService -> getSolicitud');
    }
}

async function createSolicitud(solicitud) {
    try{
        const {person, grant} = solicitud;
        const personFound = await Person.findOne({name: person});
        if(!personFound){
            return [null, 'No existe la persona'];
        }
        const grantFound = await Grant.findOne({name: grant});
        if(!grantFound){
            return [null, 'No existe la beca'];
        }
        const solicitudFound = await Solicitud.findOne({person: personFound._id, grant: grantFound._id});
        if(solicitudFound){
            return [null, 'Ya existe una solicitud con esos datos'];
        }
        const newSolicitud = new Solicitud({
            person: personFound,
            grant: grantFound
        });
        await newSolicitud.save();
        return [newSolicitud, null];
    }catch(error){
        handleError(error, 'solicitudService -> createSolicitud');
    }
}

async function deleteSolicitud(id){
    try{
        const solicitud = await Solicitud.findByIdAndDelete(id);
        if(!solicitud){
            return [null, 'No existe la solicitud'];
        }
        return [solicitud, null];
    }catch(error){
        handleError(error, 'solicitudService -> deleteSolicitud');
    }
}

async function updateSolicitud(id, solicitud){
    try{
        const solicitudFound = await Solicitud.findById(id);
        if(!solicitudFound){
            return [null, 'No existe la solicitud'];
        }
        const {person, grant, state} = solicitud;
        const personFound = await Person.findOne({name: person});
        if(!personFound){
            return [null, 'No existe la persona'];
        }
        const grantFound = await Grant.findOne({name: grant});
        if(!grantFound){
            return [null, 'No existe la beca'];
        }
        if(state === 'Pendiente'){
            return [null, 'No se puede cambiar el estado a pendiente'];
        }
        solicitudFound.state = state;
        solicitudFound.person = personFound._id;
        solicitudFound.grant = grantFound._id;
        await solicitudFound.save();
        return [solicitudFound, null];
    }catch(error){
        handleError(error, 'solicitudService -> updateSolicitud');
    }
}

module.exports = {
    getSolicitudes,
    createSolicitud,
    deleteSolicitud,
    updateSolicitud,
    getSolicitud
};