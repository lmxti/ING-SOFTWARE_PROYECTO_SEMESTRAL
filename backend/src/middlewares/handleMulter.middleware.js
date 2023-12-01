const multer = require("multer");
const fs = require("fs").promises;
const person = require("../models/person.model.js");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try{
    const { id } = req.params;
    const foundPerson = await person.findById(id).exec();
      if (!foundPerson) {
        return Promise.reject(new Error("No se encontro la persona"));
      }
      const dir = "./src/uploads/" + foundPerson.name.toString().replace(" ", "_");
      try{
        await fs.access(dir);
      }catch(err){
        await fs.mkdir(dir, { recursive: true });
      }
      cb(null, dir);
    }catch(err){
      return Promise.reject(err);
    }
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
