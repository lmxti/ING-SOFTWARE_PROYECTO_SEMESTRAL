const mongoose = require("mongoose");

const grantSchema = new mongoose.Schema({
        // Nombre de la beca
        name: {
            type: String,
            required: true,
        },
        // Requisitos para postular a beca
        requirements: [{
            type: String,
            required: true,
        }],
        // Documentos necesarios para postular a beca
        documents: [{
            type: String,
            required: true,
        }],
        // Monto que la beca otorga
        amount: {
            type: Number,
            required: true,
        },
        // Estado de la beca true:abierta y false:cerrada
        state: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    // Configuración de opciones
    {
        timestamps: true,
        versionKey: false
    }
)


const Grant = mongoose.model("Grant", grantSchema);
module.exports = Grant;
