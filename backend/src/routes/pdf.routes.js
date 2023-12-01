const express = require("express");
const router = express.Router();
const upload = require("../middlewares/handleMulter.middleware.js");
const pdfController = require("../controller/pdf.controller.js");

router.post("/:id", upload.single('pdf'), pdfController.createPDF);
router.get("/", pdfController.getPDF);
router.get("/:personId", pdfController.getPDFsForPerson);
router.delete("/:id", pdfController.deletePDF);

module.exports = router;