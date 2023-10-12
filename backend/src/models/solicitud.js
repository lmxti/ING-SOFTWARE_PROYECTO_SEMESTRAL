const { Schema, model } = require('mongoose');
const Usuario = require('./usuario');
const Beca = require('./beca');

const solicitudSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: Usuario,
    },
    beca: {
        type: Schema.Types.ObjectId,
        ref: Beca,
    },
    estado: {
        type: String,
        enum: [
            'pendiente',
            'aceptada',
            'rechazada',
        ]
    },
    fecha: {
        type: Date,
    },
},
    {
        timestamps: true,
    });

const Solicitud = model("Solicitud", solicitudSchema);
module.exports = Solicitud;