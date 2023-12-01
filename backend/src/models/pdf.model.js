const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
        person: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person",
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        },
    }
)

const PDF = mongoose.model("PDF", pdfSchema);

module.exports = PDF;