const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    beca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beca',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

module.exports = Solicitud;
