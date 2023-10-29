const express = require("express");
const router = express.Router();

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const revisionController = require("../controller/reviewGrant.controller.js");


// <----------------------------- Rutas de revisiones ----------------------------->

router.post("/createRevision", revisionController.createReview);

router.get("/getRevisiones/", authorizationMiddleware.isAdmin, revisionController.getReview);
router.delete("/deleteRevision/:id", authorizationMiddleware.isAdmin, revisionController.deleteReview);
router.post("/compararUsuarios", revisionController.compararUsuarios);
router.post("/comprobarDocumentos", revisionController.comprobarDocumentos);

module.exports = router;