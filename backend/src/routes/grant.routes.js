// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Controlador de becas
const grantController = require('../controller/grant.controller.js');

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

// Define las rutas para las becas
router.get("/",  grantController.getGrants);
router.post("/", authorizationMiddleware.isAdmin, grantController.createGrant);


module.exports = router;