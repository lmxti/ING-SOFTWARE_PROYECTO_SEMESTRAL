const express = require('express');

const applicationController = require('../controller/application.controller.js');

const authorizationMiddleware = require('../middlewares/authorization.middleware.js');

const authenticationMiddleware = require('../middlewares/authentication.middleware.js');

const router = express.Router();

router.use(authenticationMiddleware);

router.post('/', applicationController.createApplication);
router.get('/', applicationController.getApplications);
router.put('/:id', applicationController.updateApplication);
router.delete('/:id', applicationController.deleteApplication);
router.get('/:id', applicationController.getApplicationById);

router.get('/aplicationPerson/:id', applicationController.getApplicationPersonID)

module.exports = router;