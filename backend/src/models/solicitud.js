const mongoose = require('mongoose');
const STATES = require('../constants/states.js');

const solicitudSchema = new mongoose.Schema({
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    grant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grant',
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: STATES,
        default: STATES[2]
    }
},
{
    versionKey: false,
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

module.exports = Solicitud;
