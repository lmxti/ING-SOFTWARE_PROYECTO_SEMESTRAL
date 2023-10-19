const express = require('express');
const personController = require('../controller/personController.js');
const authorizationMiddleware = require('../middlewares/authorization.js');
const authenticationMiddleware = require('../middlewares/authentication.js');
const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", personController.getPersons);
router.post("/", authorizationMiddleware, personController.createPerson);

module.exports = router;