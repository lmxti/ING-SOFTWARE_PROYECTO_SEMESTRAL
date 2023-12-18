// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Controlador de personWithGrants
const personWithGrantsController = require('../controller/personWithGrants.controller.js');

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/",  personWithGrantsController.getPersonsWithGrants);


module.exports = router;