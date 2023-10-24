import {Schema,model} from "mongoose"

const becasSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        unique: true
    },
    requisitos:{
        type: String,
        required: true,
    },
    documentos:{
        type: String,
        required: true
    },
    monto:{
        type: Number,
        required: true
    },
    estado:{
        type: Boolean,
    },
    
});

export default model ("Beca",becasSchema);