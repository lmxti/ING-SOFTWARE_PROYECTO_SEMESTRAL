"use strict";

const Person = require("../models/person.js");
const Role = require("../models/role.js");
const { handleError } = require("../utils/errorHandler.js");

// <----------------------------------------------------------------->
/**
 * Obtiene todos las personas de la base de datos
 * @returns {Promise} Promesa con el objeto de las personas de la base de datos
 */
async function getPersons() {
  try {
    const persons = await Person.find()
      .select("-password")
      .populate("role")
      .exec();
    if (!persons) {
      return [null, "No hay personas en la base de datos"];
    }
    return [persons, null];
  } catch (error) {
    handleError(error, "personService -> getPersons");
  }
}

async function createPerson(person) {
  try {
    const {
      name,
      surname,
      rut,
      gender,
      birthdate,
      address,
      phone,
      email,
      password,
      role
    } = person;

    // Verificacion de persona en el sistema, por RUT
    const personFound = await Person.findOne({ rut: rut });
    if (personFound) {
      return [null, "Este rut ya esta asociado a una cuenta"];
    }

    const roleFound = await Role.find({ name: { $in: role }});
    if (roleFound.length === 0) {
      return [null, "El rol no existe"];
    }

    const myRole = roleFound.map((role) => role._id);

    const newPerson = new Person({
      name, //required
      surname, //required
      rut, //required and *unique*
      gender, //required
      birthdate, //required
      address, //required
      phone, //required
      email, //required and *unique*
      password: await Person.encryptPassword(password), //required
      role: myRole,
    });
    await newPerson.save();
    return [newPerson, null];
  } catch (error) {
    handleError(error, "personService -> createPerson");
  }
}
// <----------------------------------------------------------------->
/**
 * Obtiene una persona de la base de datos a traves del id
 * @param {String} id - Id de la persona
 * @returns {Promise} Promesa con el objeto de la persona de la base de datos
 */
async function getPersonById(id) {
  try {
    const person = await Person.findById({ _id: id })
      .select("-password")
      .populate("role")
      .exec();
    // Verificacion de persona en la base de datos, por ID
    if (!person) {
      return [null, "No existe persona con ese id"];
    }
    return [person, null];
  } catch (error) {
    handleError(error, "personService -> getPersonById");
  }
}
// <----------------------------------------------------------------->
/**
 * Actualiza una persona por su id en la base de datos
 * @param {string} id Id de la persona
 * @param {Object} req user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de la persona de la base de datos
 */
async function updatePersonById(id, req) {
  try {
    // Verificacion de persona en la base de datos, por ID
    const userFound = await Person.findById(id);
    if (!userFound) {
      return [null, "No existe persona con ese id"];
    }
    // Extraccion de datos del body (nuevos datos de la persona)
    const {
      name,
      surname,
      rut,
      gender,
      birthdate,
      address,
      phone,
      email,
      password,
    } = req.body;

    // Verificacion de contrasena
    const matchPassword = await Person.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword) {
      return [null, "La contrasena no coincide"];
    }

    const myRole = userFound.map((role) => role._id);

    const personUpdated = await Person.findByIdAndUpdate(
      id,
      {
        name,
        surname,
        rut,
        gender,
        birthdate,
        address,
        phone,
        email,
        password: await Person.encryptedPassword(newPassword || password),
        role: myRole,
      },
      { new: true }
    );
    return [personUpdated, null];
  } catch (error) {
    handleError(error, "personService -> updatePerson");
  }
}
// <----------------------------------------------------------------->
/**
 * Elimina una persona por su id en la base de datos
 * @param {string} id Id de la persona
 * @returns {Promise} Promesa con el objeto de la persona de la base de datos
 */

async function deletePersonById(id) {
    try{
        return await Person.findByIdAndDelete(id);
    }catch(error){
        handleError(error, "personService -> deletePerson");
    }
};

module.exports = {
    getPersons,
    createPerson,
    getPersonById,
    updatePersonById,
    deletePersonById,
}