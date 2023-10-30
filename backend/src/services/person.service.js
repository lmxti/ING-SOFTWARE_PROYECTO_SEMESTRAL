"use strict";

const Person = require("../models/person.model.js");
const Role = require("../models/role.model.js");
const { handleError } = require("../utils/errorHandler");

// <----------------------------------------------------------------->
/**
 * Crea un nuevo usuario en la base de datos
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function createPerson(user) {
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
    } = user;

    // Verificacion de existencia de persona en la base de datos
    const personFound = await Person.findOne({ rut: rut, email: email });
    if (personFound) return [null, "El usuario ya existe"];
    // Verificacion de rol de la persona en la base de datos
    const roleFound = await Role.find({ name: { $in: role}});
    if (roleFound.length === 0) {
      return [null, "El rol no existe"];
    }
    // Almacenamiento del id de rol de la persona
    const myRole = roleFound.map( (role) => role._id);

    const newPerson = new Person({
      name,
      surname,
      rut,
      gender,
      birthdate,
      address,
      phone,
      email,
      password: await Person.encryptPassword(password),
      role: myRole
    })
    // Guardado de persona en la base de datos
    await newPerson.save();
    return [newPerson, null];
  } catch(error){
    handleError(error, "person.service -> createPerson");
  }
}


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
    handleError(error, "user.service -> getPersons");
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
    handleError(error, "user.service -> getPersonById");
  }
}
// <----------------------------------------------------------------->
/**
 * Actualiza una persona por su id en la base de datos
 * @param {string} id Id de la persona
 * @param {Object} req user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de la persona de la base de datos
 */
async function updatePersonById(id, body) {
  try {
    const personFound = await Person.findById(id);
    if (!personFound) {
      return [null, "No existe persona con ese id"];
    }
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
      role,
    } = body;


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
        password,
        role
      },
      { new: true },
    );
      return [personUpdated, null];
  } catch (error) {
    handleError(error, "user.service -> updatePersonById");
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
        const personFound = await Person.findById(id);
        if (!personFound) {
            return [null, "No existe persona con ese id"];
        }
        const personDeleted = await Person.findByIdAndDelete(id);
        return [personDeleted, null];
    }catch(error){
        handleError(error, "user.service -> deletePerson");
    }
};

module.exports = {
    getPersons,
    createPerson,
    getPersonById,
    updatePersonById,
    deletePersonById,
}
