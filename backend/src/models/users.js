import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    nombre: { 
        type: String ,
        required: true
    },
    apellido: { 
        type: String,
        required: true
    },
    rut: { 
        type: String,
        required: true,
        unique: true
    },
    genero: { 
        type: String,
        required: true
    },
    direccion: { 
        type: String,
        required: true
     },
    telefono: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true 
    },
    contraseña: { 
        type: String,
        required: true
    },
    cuentaBanco: { 
        type: String
    },
    fechaNacimiento: { 
        type: Date,
        required: true
    },
},
    {
        timestamps: true
    });


export default model("Users",usersSchema);