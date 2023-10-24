// Importacion de los modulos a utilizar
const express = require("express");
const router = express.Router();
const solicitudController = require("../controller/solicitudController.js");

// Definir las rutas
router.post("/createSolicitud", solicitudController.createSolicitud);
router.get("/getSolicitudes", solicitudController.getSolicitudes);

// Exportar las rutas
module.exports = router;