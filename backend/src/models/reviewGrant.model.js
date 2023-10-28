// FELIPE BURGOS

const mongoose = require("mongoose");

const reviewGrantSchema = new mongoose.Schema({
    // Referencia a la persona que postulo
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    // Referencia a la beca (Documentos necesarios para la beca)
    documentsGrant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grant',
        required: true
    },
    // Referencia a la postulacion (Documentos entregados por la persona)   
    documentsApplication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
});


const ReviewGrant = mongoose.model("ReviewGrant", reviewGrantSchema);
module.exports = ReviewGrant;