const { respondSuccess, respondError } = require('../utils/resHandler');
const { handleError } = require('../utils/errorHandler');
const PDFService = require('../services/pdf.service.js');

async function createPDF(req, res) {
    try {
      const { file } = req;
      const { id } = req.params;
      const [pdf, error] = await PDFService.createPDF(file, id);
      if (error) {
        return respondError(req, res, 400, error);
      }
      return respondSuccess(req, res, 201, pdf);
    } catch (error) {
      handleError(error, 'pdfController -> createPDF');
      respondError(req, res, 500, 'Error interno del servidor');
    }
  }

async function getPDF(req, res) {
    const pdf = await PDFService.getPDF();
    if (!pdf) {
        return respondError(req, res, 404, 'No existe el pdf');
    }
    respondSuccess(req, res, 200, pdf);
}

async function getPDFsForPerson(req, res){
  try {
    const { personId } = req.params;
    const [pdfs, error] = await PDFService.getPDFsForPerson(personId);
    if (error) {
      return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, pdfs);
  } catch (error) {
    handleError(error, 'pdfController -> getPDFsForPerson');
    respondError(req, res, 500, 'Error interno del servidor');
  }
}

async function deletePDF(req, res) {
  try {
    const { id } = req.params;
    const [pdf, error] = await PDFService.deletePDF(id);
    if (error) {
      return respondError(req, res, 400, error);
    }
    return respondSuccess(req, res, 200, pdf);
  } catch (error) {
    handleError(error, 'pdfController -> deletePDF');
    respondError(req, res, 500, 'Error interno del servidor');
  }
}

module.exports = { createPDF, getPDF, getPDFsForPerson, deletePDF };