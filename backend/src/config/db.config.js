const mongoose = require("mongoose");
const { DB_URL } = require("./env.config");
const { handleError } = require("../utils/errorHandler.js");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * @name setupDB
 * @description Conecta a la base de datos
 * @returns {Promise<void>}
 * @throws {Error}
 */

async function setupDB() {
  try {
    await mongoose.connect(DB_URL, options);
    console.log("Conectado a la base de datos");
  } catch (error) {
    handleError(error, "/db.config -> setupDB");
  }
}

module.exports = { setupDB };
