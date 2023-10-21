// Importamos connect desde mongoose para conectarnos a la base de datos
const mongoose = require("mongoose");
// Configuracion de variables de entorno
const { DB_URL } = require("./env.config.js");
const { handleError } = require("../utils/errorHandler.js");

// Opciones de configuracion de la conexion a la base de datos
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 *@name setupDB
 *@description Función que se encarga de conectar la base de datos
 *@returns {Promise<void>}
 *@throws {Error}
 */

async function setupDB() {
  try {
    await mongoose.connect(DB_URL, options);
    console.log("=> Conexión exitosa a la base de datos");
  } catch (error) {
    handleError(error, "/db.config -> setupDB");
  }
}

module.exports = { setupDB };