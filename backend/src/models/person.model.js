import { Schema, model } from 'mongoose';

const personSchema = new Schema(
    {
        name: String,
        surname: String,
    },
    {
        timestamps: true, // Configura las opciones directamente en el segundo argumento del constructor del esquema
        versionKey: false
    }
);

export default model('Person', personSchema);
