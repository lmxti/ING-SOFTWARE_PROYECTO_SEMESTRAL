// Importacion de los modulos a utilizar
const express = require("express");
const router = express.Router();
const solicitudController = require("../controller/solicitudController.js");
const authorizationMiddleware = require("../middlewares/authorization.js");

// Definir las rutas
router.post("/createSolicitud", solicitudController.createSolicitud);
router.get("/getSolicitudes", authorizationMiddleware,solicitudController.getSolicitudes);
router.get("/getSolicitud/:id", solicitudController.getSolicitud);
router.delete("/deleteSolicitud/:id", authorizationMiddleware,solicitudController.deleteSolicitud);
router.put("/updateSolicitud/:id", solicitudController.updateSolicitud);

// Exportar las rutas
module.exports = router;