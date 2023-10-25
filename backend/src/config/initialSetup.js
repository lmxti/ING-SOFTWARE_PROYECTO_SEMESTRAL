"use strict";
 
const Person = require("../models/person.model.js");
const Role = require("../models/role.model.js");

/**
 * Crea los roles por defecto en la base de datos.
 * @async
 * @function createRoles
 * @returns {Promise<void>}
 */

// Esta funcion se encarga de crear los roles si es que no existe ninguno en la base de datos.
async function createRoles() {
    try{
        // Busca y cuenta los roles en la base de datos
        const count = await Role.estimatedDocumentCount();
        // Si hay roles en la base de datos, no hace nada
        if (count > 0) {
            return;
        }
        // Crea los roles por defecto
        await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'admin' }).save(),
        ]);
        console.log("Roles creados exitosamente");
    } catch(error){
        console.error(error);
    }
};

// Esta funcion se encarga de crear personas por defecto en la base de datos
/**
 * @async
 * @function createPersons(){
 * @returns {Promise<void>}
 */

async function createPersons(){
    try {
        const count = await Person.estimatedDocumentCount();
        if (count > 0) {
            return;
        }
        const admin = await Role.findOne({ name: "admin" });
        const user = await Role.findOne({ name: "user" });

        await Promise.all([
            // Nueva persona de rol usuario
            new Person({ name: "user", surname: "null", rut: "00.000.000-0", gender: "Masculino", birthdate: "1990-05-15",address:"null",phone:"12345678", email: "user@localhost.com", password: await Person.encryptPassword("admin"), role: [user._id] }).save(),
            // Nueva persona de rol administrador
            new Person({ name: "admin", surname: "null", rut: "11.111.111-1", gender: "Masculino", birthdate: "1990-05-15",address:"null",phone:"87654321", email: "admin@localhost.com", password: await Person.encryptPassword("admin"), role: [admin._id] }).save()
        ]);
        console.log("Se han creado los usuarios por defecto, 1 administrador y 1 usuario");
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    createRoles,
    createPersons,
  };
  
