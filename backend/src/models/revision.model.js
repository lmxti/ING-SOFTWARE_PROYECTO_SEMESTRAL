const mongoose = require('mongoose');

const revisionSchema = new mongoose.Schema({
    /*
    solicitud: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solicitud',
        required: true
    }
    */
});

const Revision = mongoose.model('Revision', revisionSchema);

module.exports = Revision;