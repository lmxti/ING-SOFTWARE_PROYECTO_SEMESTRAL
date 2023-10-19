"use strict";

const express = require("express");
const personRoutes = require("./personRoutes.js");
const authRoutes = require("./authRoutes.js");

const authenticationMiddleware = require("../middlewares/authentication.js");
const router = express.Router();

router.use("/persons", authenticationMiddleware, personRoutes);
router.use("/auth", authRoutes);

module.exports = router;