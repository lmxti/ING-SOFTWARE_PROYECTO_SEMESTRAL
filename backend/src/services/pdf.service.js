const PDF = require("../models/pdf.model.js");
const { handleError } = require("../utils/errorHandler");
const Person = require("../models/person.model.js");

async function createPDF(file, id) {
    try {
      Person.findById(id, (err, Person) => {
        if (err) {
          return handleError(err);
        }
        if(!Person){
          return handleError(err);
        }
      });
      let aux = PDF.map((PDF)=>{
        const newPDF = new PDF({
          file,
          id,
        });
        newPDF.save();
        return [newPDF, null];
      })
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