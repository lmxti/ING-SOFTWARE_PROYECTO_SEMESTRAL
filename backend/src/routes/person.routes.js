// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Controlador de usuarios
const personController = require('../controller/person.controller.js');

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

// Define las rutas para los usuarios
router.get("/",  personController.getPersons);
router.post("/", personController.createPerson);
router.get("/:id", authorizationMiddleware.isAdmin, personController.getPersonById);
router.put("/:id", authorizationMiddleware.isAdmin, personController.updatePersonById);
router.delete("/:id", authorizationMiddleware.isAdmin, personController.deletePerson);




module.exports = router;