"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    surname: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    rut: {
      type: String,
      required: true,
      unique: true,
      maxLength: 12,
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
      unique: true,
    },
    password: {
      type: String,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    bankAccount: {
      type: String,
    },
    birthdate: {
      type: Date,
    },
  },
  {
    versionKey: false,
  },
  {
    timestamps: true,
  }
);

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;

