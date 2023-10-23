// Importamos los modulos a utilizar
const express = require("express");
const router = express.Router();
const becaController = require("../controller/becaController.js");

// Definir las rutas
router.post("/createBeca", becaController.createBeca);
router.delete("/deleteBeca/:id", becaController.deleteBeca);
router.get("/getBecas", becaController.getBecas);
router.put("/updateBeca/:id", becaController.updateBecaID);

// Exportar las rutas
module.exports = router;