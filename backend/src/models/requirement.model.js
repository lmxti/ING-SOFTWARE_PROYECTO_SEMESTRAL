const moongoose = require('mongoose');

const requirements = require('../constants/requirements.constants.js');

const requirementsSchema = new moongoose.Schema(
    {
        name: { type: String, required: true, enum: requirements}
    },
    {
        versionKey: false,
    }
);

const Requirement = moongoose.model("Requirement", requirementsSchema);
module.exports = Requirement;