const express = require('express');
const router = express.Router();
const authorizationMiddleware = require('../middlewares/authori.middleware.js');
const authenticationMiddleware = require('../middlewares/authent.middleware.js');
const appealController = require('../controllers/appeal.controller.js');

router.use(authenticationMiddleware);
//define ruta para apelaciones
router.post("/",authorizationMiddleware.isAdmin);
router.put("/:id",authorizationMiddleware.isAdmin);
router.delete("/:id",authorizationMiddleware.isAdmin);

module.exports = router;