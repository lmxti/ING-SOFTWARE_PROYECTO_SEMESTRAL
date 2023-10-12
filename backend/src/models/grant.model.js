import { Schema, model } from 'mongoose';

const grantSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        requirements: {type: [String], required: true},
        documents: {type: [String], required: true},
        amount: {type: Number, required: true},
    }
);

export default model('Grant', grantSchema);
