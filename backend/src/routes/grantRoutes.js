// Importamos los modulos a utilizar
const express = require("express");
const router = express.Router();
const grantController = require("../controller/grantController.js");

// Definir las rutas
router.post("/createGrant", grantController.createGrant);
router.delete("/deleteGrant/:id", grantController.deleteGrant);
router.get("/getGrants", grantController.getGrants);
router.put("/updateGrant/:id", grantController.updateGrantID);

// Exportar las rutas
module.exports = router;