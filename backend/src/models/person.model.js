const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// <-------------------- MODELO PERSONA -------------------->
const personSchema = new mongoose.Schema(
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
        // Cuenta bancaria de la persona
            bankAccount: { type: String},
        // Rol
            role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
    },
    {
        timestamps: true, // Configura las opciones directamente en el segundo argumento del constructor del esquema
        versionKey: false
    }
);

// Encripta contrasena de persona
personSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compara contrasena de persona
personSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
