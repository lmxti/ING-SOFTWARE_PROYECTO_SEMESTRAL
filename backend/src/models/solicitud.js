const mongoose = require("mongoose");
const STATES = require("../constants/states.js");

const solicitudSchema = new mongoose.Schema(
  {
    person: {
      type: {
        name: String,
        surname: String,
        rut: String,
        gender: String,
        birthdate: String,
        address: String,
        phone: String,
        email: String,
        bankAccount: String,
      },
    },
    grant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grant",
      required: true,
    },
    state: {
      type: String,
      required: true,
      enum: STATES,
      default: STATES[2],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Solicitud = mongoose.model("Solicitud", solicitudSchema);

module.exports = Solicitud;
