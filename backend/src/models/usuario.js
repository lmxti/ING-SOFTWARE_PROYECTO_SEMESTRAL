import { Schema as __Schema, model } from "mongoose";
const Schema = __Schema;

const usuarioSchema = new Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    rut: {
        type: String,
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
    },
    password: {
        type: String,
    },
    role: {
        type: String,
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

const Usuario = model("Usuario", usuarioSchema);
export default Usuario;