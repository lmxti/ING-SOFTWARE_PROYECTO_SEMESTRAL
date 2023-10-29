const mongoose = require('mongoose');
const STATES = require('../constants/states.constants.js');

const applicationSchema = new mongoose.Schema({
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
    },
    grant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grant',
        required: true,
    },
    documents: {
        type: [String],
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