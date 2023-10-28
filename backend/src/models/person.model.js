const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const personSchema = new mongoose.Schema({
    //nombre 
    name: {
        type: String,
        required: true,
    },
    //apellido 
    lastname: {
        type: String,
        required: true,
    },
    //rut
    rut: {
        type: String,
        required: true,
        unique: true,
    },
    //gender
    gender: {
        type: String,
        required: true,
        enum: ['Masculino', 'Femenino', 'Otro'],
    },
    //fecha nacimiento
    birthdate: {
        type: Date,
        required: true,
    },
    //direccion
    address: {
        type: String,
        required: true,
    },
    //telefono
    phone: {
        type: String,
        required: true,
    },
    //email
    email: {
        type: String,
        required: true,
        unique: true,
    },
    //contraseña
    password: {
        type: String,
        required: true,
    },
    // //cuenta bancaria
    // bankAccount: {
    //     type: String,
    //     required: true,
    // },
    //rol
    role: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Role',
    },
},
{
    timestamps: true,
    versionKey: false
});

//metodo para encriptar contraseña
personSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

//metodo para comparar contraseña
personSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
