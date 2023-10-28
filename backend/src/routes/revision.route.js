const express = require("express");
const router = express.Router();

const revisionController = require("../controller/revision.controller.js");

router.post("/createRevision", revisionController.createRevision);
router.get("/getRevision", revisionController.getRevision);
router.delete("/deleteRevision/:id", revisionController.deleteRevision);
router.post("/compararDatosEnviados", revisionController.compararDatosEnviados);
router.post("/comprobarDocumentos", revisionController.comprobarDocumentos);

module.exports = {
    router,
};