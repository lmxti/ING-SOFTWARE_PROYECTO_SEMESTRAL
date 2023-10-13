import { Schema, model } from 'mongoose';

const personSchema = new Schema(
    {
        // Nombre de la persona
            name: { type: String, required: true},
        // Apellido de la persona
            surname: { type: String, required: true},
        // Rut de la persona
            rut: { type: String, required: true, unique: true},
        // Genero de la persona
            gender: { type: String, required: true, enum: ['Masculino', 'Femenino', 'Otro']},
        // Fecha de nacimiento de la persona
            birthdate: { type: Date, required: true},
        // Direccion de la persona
            address: { type: String, required: true},
        // Telefono de la persona
            phone: { type: String, required: true},
        // Correo electronico de la persona
            email: { type: String, required: true, unique: true},
        // Contrasena
            password: { type: String, required: true},
        // Rol de la persona
            role: { type: String, required: true},
        // Cuenta bancaria de la persona
            bankAccount: { type: String},
    },
    {
        timestamps: true, // Configura las opciones directamente en el segundo argumento del constructor del esquema
        versionKey: false
    }
);

export default model('Person', personSchema);
