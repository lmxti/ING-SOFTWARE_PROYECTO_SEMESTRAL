const mongoose = require("mongoose");


const appealSchema = new mongoose.Schema({
    //razon
    reason : {
        type: String,
        required: true,
    },
    //estado
    status: {
        type: String,
        enum: ['Aceptado', 'Rechazado', 'Pendiente'],
        default: 'Pendiente',
    },
    //fecha apelacion
    appealDate: {
        type: Date,
        default: Date.now,
    }
});

const Appeal = mongoose.model("Appeal", appealSchema);
