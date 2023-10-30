const express = require("express");
const router = express.Router();
const upload = require("../middlewares/handleMulter.middleware.js");
const pdfController = require("../controller/pdf.controller.js");

router.post("/", upload.single('pdf'), pdfController.createPDF);
router.get("/", pdfController.getPDF);

module.exports = router;