const mongoose = require("mongoose");

const grantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        requirements: [{
            type: String,
            required: true,
        }],
        documents: [{
            type: String,
            required: true,
        }],
        amount: {
            type: Number,
            required: true,
        },
    }
)

const Grant = mongoose.model("Grant", grantSchema);

module.exports = Grant;