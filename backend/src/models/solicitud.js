import { Schema, model } from 'mongoose';
import Usuario from './usuario';
import Beca from './beca';

const solicitudSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: Usuario,
    },
    beca: {
        type: Schema.Types.ObjectId,
        ref: Beca,
    },
    estado: {
        type: String,
        enum: [
            'pendiente',
            'aceptada',
            'rechazada',
        ]
    },
    fecha: {
        type: Date,
    },
},
    {
        timestamps: true,
    });

// Exportamos el modelo para su debido uso
export default model ('Solicitud', solicitudSchema);