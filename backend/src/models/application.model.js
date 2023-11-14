const mongoose = require('mongoose');
const STATES = require('../constants/states.constants.js');

const applicationSchema = new mongoose.Schema({
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
        ref: 'Grant',
        required: true,
    },
    status: {
        type: String,
        enum: STATES,
        default: 'Pendiente',
    },
},
{
    timestamps: true,
}
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;