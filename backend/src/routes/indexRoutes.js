"use strict";

const express = require("express");
const personRoutes = require("./personRoutes.js");
const authRoutes = require("./authRoutes.js");
const grantRoutes = require("./grantRoutes.js");
const solicitudRoutes = require("./solicitudRoutes.js");

const authenticationMiddleware = require("../middlewares/authentication.js");
const router = express.Router();

router.use("/persons", authenticationMiddleware, personRoutes);
router.use("/auth", authRoutes);
router.use("/grant", grantRoutes);
router.use("/solicitud", solicitudRoutes);

module.exports = router;