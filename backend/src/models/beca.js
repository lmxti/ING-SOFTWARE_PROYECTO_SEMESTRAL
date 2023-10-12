import { Schema as __Schema, model } from "mongoose";
const Schema = __Schema;

const becaSchema = new Schema({
    name: {
        type: String,
    },
    requirement: {
        type: String,
    },
    documents: [{
        type: String,
    }],
    mount: {
        type: Number,
    }
});

const Beca = model("Beca", becaSchema);
export default Beca;