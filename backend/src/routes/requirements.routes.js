// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Controlador de usuarios
const requirementController = require('../controller/requirement.controller.js');


/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

// Define las rutas para los usuarios
router.get("/",  requirementController.getRequirements);





module.exports = router;