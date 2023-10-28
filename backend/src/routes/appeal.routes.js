const express = require('express');
const router = express.Router();
const authorizationMiddleware = require('../middlewares/authorization.middleware.js');
const authenticationMiddleware = require('../middlewares/authentication.middleware.js');
const appealController = require('../controller/appeal.controller.js');

router.use(authenticationMiddleware);


// SOLICITUD POST: CREA UNA NUEVA APELACION
router.post("/",authorizationMiddleware.isAdmin, appealController.createAppeal);
// SOLICITUD GET: DEVUELVE TODAS LAS APELACIONES
router.get("/", appealController.getAppeals);
// SOLICITUD GET: DEVUELVE APELACION POR ID
router.get("/:id", appealController.getAppealById);

// SOLICITUD PUT: ACTUALIZA APELACION POR ID
router.put("/:id",authorizationMiddleware.isAdmin, appealController.updateAppealById);

router.delete("/:id",authorizationMiddleware.isAdmin, appealController.deleteAppealById);

module.exports = router;