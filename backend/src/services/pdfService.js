const PDF = require("../models/PDF");
const { handleError } = require("../utils/errorHandler");

async function createPDF(name, filePath) {
    try {
      const newPDF = new PDF({
        name,
        filePath,
      });
      await newPDF.save();
      return [newPDF, null];
    } catch (error) {
      const errorMessage = 'No se pudo crear el PDF.';
      handleError(error, 'pdfService -> createPDF', errorMessage);
      return [null, errorMessage];
    }
  }

async function getPDF() {
    try {
        const pdf = await PDF.find();
        if (!pdf) {
            return [null, "No hay pdf en la base de datos"];
        }
        return [pdf, null];
    } catch (error) {
        handleError(error, "pdfService -> getPDF");
    }
}

module.exports = { createPDF, getPDF };