"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Enrutador de personas
const personRoutes = require("./person.routes.js");
const authRoutes = require("./auth.routes.js");
const grantRoutes = require("./grant.routes.js");

// Middleware de autenticacion
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Definicion de las rutas para autenticacion /api/auth
router.use("/auth", authRoutes);
// Definicion de las rutas para las personas /api/persons
router.use("/persons", authenticationMiddleware, personRoutes);
// Definicion de las rutas para las becas /api/grants
router.use("/grants", authenticationMiddleware, grantRoutes);

// Exporta el enrutador
module.exports = router;