"use strict";

const mongoose = require("mongoose");
const ROLES = require("../constants/roles.constants");


const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ROLES,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default model("Role", roleSchema);