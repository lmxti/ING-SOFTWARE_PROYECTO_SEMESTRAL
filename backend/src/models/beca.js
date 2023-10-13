import { Schema, model } from "mongoose";

const becaSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    requirements: {
        type: String,
        required: true
    },
    documents: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

// Exportamos el modelo para su debido uso
export default model ('Beca', becaSchema);