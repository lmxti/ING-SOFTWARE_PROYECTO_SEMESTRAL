const mongoose = require('mongoose');
const STATES = require('../constants/states.constants.js');

const applicationSchema = new mongoose.Schema({
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
    },
    beca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beca',
        required: true,
    },
    status: {
        type: String,
        enum: STATES,
        default: 'Pendiente',
    },
},
{
    timestamps: true,
}
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;