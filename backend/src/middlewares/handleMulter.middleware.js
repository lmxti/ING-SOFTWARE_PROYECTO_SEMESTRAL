const multer = require("multer");
const fs = require("fs");
const person = require("../models/person.model.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.params;
    person.findById(id).exec().then((foundPerson) => {
      if (!foundPerson) {
        return Promise.reject("No se encontro la persona");
      }
      const dir = "./src/uploads" + foundPerson.name.toString().replace(" ", "_");
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    })
    .catch((err) =>{
      cb(err);
    })
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb("Error: El archivo debe ser un pdf");
  },
  limits: {
    fileSize: 1024 * 1024 * 10,
  }
});

module.exports = upload;
