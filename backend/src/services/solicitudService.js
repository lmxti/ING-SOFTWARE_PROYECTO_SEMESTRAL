"use strict";

const Solicitud = require("../models/solicitud.js");
const { handleError } = require("../utils/errorHandler.js");
const Grant = require("../models/grant.js");
const Person = require("../models/person.js");
const { respondSuccess } = require("../utils/resHandler.js");

//Funcion para crear una solicitud de beca
async function createSolicitud(email, solicitudData) {
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
    const solicitudFound = await Solicitud.findOne({
      "person.email": solicitudData.person.email,
    });
    if (solicitudFound) {
      return [null, "Ya existe una solicitud de beca para esta persona"];
    }
    const newSolicitud = new Solicitud({
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
    await newSolicitud.save();
    return [newSolicitud, null];
  } catch (error) {
    handleError(error, "solicitudService -> createSolicitud");
  }
}

//Funcion para obtener una solicitud de beca especifica
async function getSolicitud(solicitudId) {
  try {
    const solicitud = await Solicitud.findById(solicitudId)
      .populate("person", "-password -role -_id", Grant)
      .populate("grant", "name -_id");
    if (!solicitud) {
      return [null, "No existe la solicitud"];
    }
    return [solicitud, null];
  } catch (error) {
    handleError(error, "solicitudService -> getSolicitud");
  }
}

//Funcion para obtener todas las solicitudes de beca
async function getSolicitudes() {
  try {
    const solicitudes = await Solicitud.find()
      .populate("person", "-password -role -_id", Grant)
      .populate("grant", "name -_id");
    if (solicitudes.length === 0) {
      return [null, "No hay solicitudes en la base de datos"];
    }
    return [solicitudes, null];
  } catch (error) {
    handleError(error, "solicitudService -> getSolicitudes");
  }
}

async function deleteSolicitud(id) {
  try {
    const solicitud = await Solicitud.findByIdAndDelete(id);
    if (!solicitud) {
      return [null, "No existe la solicitud"];
    }
    return [solicitud, null];
  } catch (error) {
    handleError(error, "solicitudService -> deleteSolicitud");
  }
}

async function updateSolicitud(id, solicitud) {
  try {
    const solicitudUpdated = await Solicitud.findByIdAndUpdate(id, solicitud, {
      new: true,
    });
    if (!solicitudUpdated) {
      return [null, "No existe la solicitud"];
    }
    return [solicitudUpdated, null];
  } catch (error) {
    handleError(error, "solicitudService -> updateSolicitud");
  }
}

module.exports = {
  getSolicitudes,
  createSolicitud,
  deleteSolicitud,
  updateSolicitud,
  getSolicitud,
};
