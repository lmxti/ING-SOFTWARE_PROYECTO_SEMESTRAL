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
        // Estado de publicacion beca, abierta por default
        state: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true, // Configura las opciones directamente en el segundo argumento del constructor del esquema
        versionKey: false
    }
)


const Grant = mongoose.model("Grant", grantSchema);
module.exports = Grant;
