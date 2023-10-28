const express = require('express');

const applicationController = require('../controller/application.controller.js');

const authorizationMiddleware = require('../middlewares/authorization.middleware.js');

const authenticationMiddleware = require('../middlewares/authentication.middleware.js');

const router = express.Router();

router.use(authenticationMiddleware);

router.post('/', applicationController.createApplication);


module.exports = router;