import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    nombre: { type: String },
    apellido: { type: String },
    rut: { type: String },
    genero: { type: String },
    direccion: { type: String },
    telefono: { type: String },
    email: { type: String },
    contraseña: { type: String },
    cuentaBanco: { type: String },
    fechaNacimiento: { type: Date },
},
    {
        timestamps: true
    });


export default model("users",usersSchema);