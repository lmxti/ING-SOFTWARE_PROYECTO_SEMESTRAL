const mongoose = require("mongoose");
const STATES = require('../constants/states.constants.js');


// <-------------------- MODELO APELACION --------------------->
const appealSchema = new mongoose.Schema({
    //usuario
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Person',
        required: true,
    },
    //estado
    status: {
        type: String,
        enum: STATES,
        default: 'Pendiente',
    },
    //motivo de la apelacion
    reason : {
        type: String,
        required: true,
    },
    //documentos o informacion adicional adjunta
    attachments: {
        type: [String],
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