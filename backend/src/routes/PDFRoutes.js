const express = require("express");
const router = express.Router();
const upload = require("../middlewares/handleMulter.js");
const pdfController = require("../controller/pdfController.js");

router.post("/createPDF", upload.single('pdf'), pdfController.createPDF);
router.get("/getPDF", pdfController.getPDF);

module.exports = router;