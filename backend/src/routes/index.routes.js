"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Enrutador de personas
const personRoutes = require("./person.routes.js");
const authRoutes = require("./auth.routes.js");
const grantRoutes = require("./grant.routes.js");
const personWithGrantsRoutes = require("./personWithGrants.routes.js");

const appealRoutes = require("./appeal.routes.js");
const reviewRoutes = require("./reviewGrant.routes.js");
const applicationRoutes = require("./application.routes.js");
const pdfRoutes = require("./pdf.routes.js");
const requirementRoutes = require("./requirements.routes.js");

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

router.use("/requirements", authenticationMiddleware, requirementRoutes);

router.use("/personGrants",authenticationMiddleware, personWithGrantsRoutes)

// RUTAS DE DOMINGO
router.use("/applications", authenticationMiddleware, applicationRoutes);
router.use("/pdf", authenticationMiddleware, pdfRoutes);






// RUTAS DE JOHAN
router.use("/appeals", authenticationMiddleware, appealRoutes);

// RUTAS DE FELIPE
router.use("/review", authenticationMiddleware, reviewRoutes);

// Exporta el enrutador
module.exports = router;