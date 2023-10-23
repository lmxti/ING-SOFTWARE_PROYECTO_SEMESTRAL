const mongoose = require("mongoose");

const becaSchema = new mongoose.Schema(
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
        state: {
            type: String,
            required: true,
        },
    }
)

const Beca = mongoose.model("Beca", becaSchema);

module.exports = Beca;