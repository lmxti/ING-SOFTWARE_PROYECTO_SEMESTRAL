const express = require("express");
const router = express.Router();

const revisionController = require("../controller/revision.controller.js");

//create revision
router.get("/getRevision", revisionController.getRevision);
router.delete("/deleteRevision/:id", revisionController.deleteRevision);

module.exports = {
    router,
};