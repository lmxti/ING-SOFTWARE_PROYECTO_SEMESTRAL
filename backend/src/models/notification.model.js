import { Schema } from "mongoose";


const NotificationSchema = new Schema({
    title: {
        type: String,
        default: 'Envio resultados de su postulacion',
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['Aceptado', 'Rechazado', 'Apelar'],
        required: true,
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // }
});