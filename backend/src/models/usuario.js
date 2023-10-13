import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    surname: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    rut: {
        type: String,
        required: true,
        unique: true,
        maxLength: 12
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: [
            'admin',
            'user'
        ]
    },
    bankAccount: {
        type: String,
    },
    birthdate: {
        type: Date,
    },
},
    {
        timestamps: true,
    });

// Exportamos el modelo para su debido uso
export default model ('Usuario', usuarioSchema);