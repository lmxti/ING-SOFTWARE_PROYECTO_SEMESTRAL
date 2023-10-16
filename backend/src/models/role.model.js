"use strict"

import { Schema, model } from "mongoose"

const roleSchema = new Schema(
    {
        name: { type: String, required: true, enum:["user","admin"]}
    },
    {
        versionKey: false,
    }
);

export default model("Role", roleSchema);

