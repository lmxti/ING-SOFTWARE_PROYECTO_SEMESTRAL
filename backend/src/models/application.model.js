import { Schema, model } from "mongoose";

const applicationSchema = new Schema(
    {
        // Referencia a persona que solicita beca (Modelo Person)
        person_id: {
            type: Schema.Types.ObjectId,
            ref: "Person",
            required: true,
        },
        // Referencia a beca que se solicita (Modelo Grant)
        grant_id: {
            type: Schema.Types.ObjectId,
            ref: "Grant",
            required: true,
        },
        // Documentos subidos por la persona (arreglo de strings)
        documents: {type: [String], required: true},
        // Estado de la solicitud (aceptada, pendiente, rechazada)
        state: {type: String, required: true},
    }
);

export default model("Application", applicationSchema);