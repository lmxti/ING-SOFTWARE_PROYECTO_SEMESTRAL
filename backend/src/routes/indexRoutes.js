"use strict";

const express = require("express");
const personRoutes = require("./personRoutes.js");
const authRoutes = require("./authRoutes.js");
const becaRoutes = require("./becaRoutes.js");
const solicitudRoutes = require("./solicitudRoutes.js");

const authenticationMiddleware = require("../middlewares/authentication.js");
const router = express.Router();

router.use("/persons", authenticationMiddleware, personRoutes);
router.use("/auth", authRoutes);
router.use("/beca", becaRoutes);
router.use("/solicitud", solicitudRoutes);

module.exports = router;