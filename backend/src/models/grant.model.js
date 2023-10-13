import { Schema, model } from 'mongoose';

const grantSchema = new Schema(
    {
        // Nombre de la beca (único)
        name: {type: String, required: true, unique: true},
        // Requerimientos de la beca (arreglo de strings)
        requirements: {type: [String], required: true},
        // Documentos requeridos para la beca (arreglo de strings)
        documents: {type: [String], required: true},
        // Monto de la beca
        amount: {type: Number, required: true},
        // Estado de la beca (true: activa, false: inactiva)
        state: {type: Boolean, required: true},
    }
);

export default model('Grant', grantSchema);
