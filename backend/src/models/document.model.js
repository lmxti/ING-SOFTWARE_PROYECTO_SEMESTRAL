const moongoose = require('mongoose');

const documents = require('../constants/documents.constants.js');

const documentsSchema = new moongoose.Schema( 
    {
        name: { type: String, required: true, enum: documents}
    }
,   { 
        versionKey: false, 
    }
);

const Document = moongoose.model("Document", documentsSchema);
module.exports = Document;