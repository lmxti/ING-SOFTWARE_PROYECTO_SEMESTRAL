const mongoose = require("mongoose");

const grantSchema = new mongoose.Schema({
        // Nombre de la beca
        name: {type: String, required: true,},
        // Requisitos para postular a beca
        requirements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Requirement'}],
        // Documentos necesarios para postular a beca
        documents: [{ type: String, required: true,}],
        // Monto que la beca otorga
        amount: { type: Number, required: true,},
        // Estado de la beca true:abierta y false:cerrada
        state: { type: Boolean, required: true, default: true,},
        // Fecha de activacion de la beca
        activationDate: { type: Date, required: true, default: Date.now },
    },
    // Configuración de opciones
    {
        timestamps: true,
        versionKey: false
    }
)

const Grant = mongoose.model("Grant", grantSchema);
module.exports = Grant;
