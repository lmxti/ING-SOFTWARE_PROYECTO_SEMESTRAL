const mongoose = require("mongoose");


const appealSchema = new mongoose.Schema({
    //usuario
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Person',
        required: true,
    },
    //estado
    status: {
        type: String,
        enum: ['Aceptado', 'Rechazado', 'Pendiente'],
        default: 'Pendiente',
    },
    //motivo de la apelación
    reason : {
        type: String,
        required: true,
    },
    //documentos o informacion adicional adjunta
    attachments: {
        type: String,
    },
    //fecha que se llevo a cabo la presentacion de la apelacion
    submissionDate: {
        type: Date,
        default: Date.now,
    },
},
{
    timestamps: true,
    versionKey: false,
});

const Appeal = mongoose.model("Appeal", appealSchema);
module.exports = Appeal;