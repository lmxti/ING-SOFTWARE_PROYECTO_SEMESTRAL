"use strict";

const Person = require("../models/person.js");
const Role = require("../models/role.js");

async function createRoles() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
    console.log("Roles creados con exito");
  } catch (error) {
    console.error(error);
  }
}

async function createPersons() {
  try {
    const count = await Person.estimatedDocumentCount();
    if (count > 0) return;
    const admin = await Role.findOne({ name: "admin" });
    const user = await Role.findOne({ name: "user" });

    await Promise.all([
      new Person({
        name: "user",
        surname: "null",
        rut: "00.000.000-0",
        gender: "Masculino",
        birthdate: "1990-05-15",
        address: "null",
        phone: "12345678",
        email: "user@localhost.com",
        password: await Person.encryptPassword("admin"),
        role: [user._id],
      }).save(),
      new Person({
        name: "admin",
        surname: "null",
        rut: "11.111.111-1",
        gender: "Masculino",
        birthdate: "1990-05-15",
        address: "null",
        phone: "87654321",
        email: "admin@localhost.com",
        password: await Person.encryptPassword("admin"),
        role: [admin._id],
      }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { createRoles, createPersons };
