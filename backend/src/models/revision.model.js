    const mongoose = require('mongoose');

    const revisionSchema = new mongoose.Schema({
        
        persona: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'person',
            required: true
        },
        
        documentos: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'beca',
            required: true
        } ,
    });

    module.exports = {
        revisionSchema,
    };