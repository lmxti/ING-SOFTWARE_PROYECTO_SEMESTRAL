const PDFModel = require("../models/pdf.model.js");
const { handleError } = require("../utils/errorHandler");
const Person = require("../models/person.model.js");

async function createPDF(file, id) {
  try {
    const person = await Person.findById(id);
    if (!person) {
      const errorMessage = "No se encontro la persona";
      throw new Error(errorMessage);
    }
    const newPDF = new PDFModel({
      name: file.originalname,
      filePath: file.path,
      person: id,
      nombre: person.name,
    });
    const PDFSaved = await newPDF.save();
    return [PDFSaved, null];
  } catch (error) {
    const errorMessage = "No se pudo crear el PDF.";
    handleError(error, "pdfService -> createPDF", errorMessage);
    return [null, errorMessage];
  }
}

async function getPDF() {
  try {
    const pdf = await PDFModel.find();
    if (!pdf) {
      return [null, "No hay pdf en la base de datos"];
    }
    return [pdf, null];
  } catch (error) {
    handleError(error, "pdfService -> getPDF");
  }
}

async function getPDFsForPerson(personId) {
  try {
    const pdfs = await PDFModel.find({ person: personId });
    if (!pdfs) {
      return [null, "No hay pdfs para esta persona"];
    }
    return [pdfs, null];
  } catch (error) {
    handleError(error, "pdfService -> getPDFsForPerson");
  }
}

async function deletePDF(id) {
  try {
    const pdf = await PDFModel.findByIdAndDelete(id);
    if (!pdf) {
      return [null, "No se encontro el pdf"];
    }
    return [pdf, null];
  } catch (error) {
    handleError(error, "pdfService -> deletePDF");
  }
}

module.exports = { createPDF, getPDF, getPDFsForPerson, deletePDF };
