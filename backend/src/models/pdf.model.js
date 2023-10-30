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
    }
)

const PDF = mongoose.model("PDF", pdfSchema);

module.exports = PDF;