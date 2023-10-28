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
router.get("/:id", grantController.getGrantById);
router.post("/", authorizationMiddleware.isAdmin, grantController.createGrant);
router.put("/:id", authorizationMiddleware.isAdmin, grantController.updateGrantById);
router.delete("/:id", authorizationMiddleware.isAdmin, grantController.deleteGrantById);
router.put("/desactivate/:id", authorizationMiddleware.isAdmin, grantController.desactivateGrantById);

module.exports = router;