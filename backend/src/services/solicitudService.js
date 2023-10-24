"use strict";

const Solicitud = require("../models/solicitud.js");
const { handleError } = require("../utils/errorHandler.js");
const Beca = require("../models/beca.js");
const Person = require("../models/person.js");

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

async function createSolicitud(solicitud) {
    try{
        const {person, beca} = solicitud;
        console.log(solicitud);
        const personFound = await Person.findOne({name: person});
        if(!personFound){
            return [null, 'No existe la persona'];
        }
        const becaFound = await Beca.findOne({name: beca});
        if(!becaFound){
            return [null, 'No existe la beca'];
        }
        const newSolicitud = new Solicitud({
            person: personFound._id,
            beca: becaFound._id
        });
        await newSolicitud.save();
        return [newSolicitud, null];
    }catch(error){
        handleError(error, 'solicitudService -> createSolicitud');
    }
}

module.exports = {
    getSolicitudes,
    createSolicitud
};