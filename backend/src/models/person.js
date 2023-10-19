"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const personSchema = new mongoose.Schema(
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
    birthdate: {
      type: Date,
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
    bankAccount: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

personSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

personSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
