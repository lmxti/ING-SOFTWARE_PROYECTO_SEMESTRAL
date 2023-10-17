"use strict"

const mongoose = require("mongoose");
const ROLES = require('../constants/roles.constants.js');

const roleSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, enum: ROLES}
    },
    {
        versionKey: false,
    }
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;