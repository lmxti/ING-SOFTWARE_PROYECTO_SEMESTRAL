const express = require('express');
const router = express.Router();
const authorizationMiddleware = require('../middlewares/authori.middleware.js');
const authenticationMiddleware = require('../middlewares/authent.middleware.js');
const appealController = require('../controller/appeal.controller.js');

router.use(authenticationMiddleware);
//define ruta para apelaciones
router.get("/", appealController.getAppeals);
router.get("/:id", appealController.getAppealById);
router.post("/",authorizationMiddleware.isAdmin, appealController.createAppeal);
router.put("/:id",authorizationMiddleware.isAdmin, appealController.updateAppealById);
router.delete("/:id",authorizationMiddleware.isAdmin, appealController.deleteAppealById);

module.exports = router;