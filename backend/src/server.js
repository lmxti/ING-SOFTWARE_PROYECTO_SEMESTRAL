// Importa el archivo 'configEnv.js' para cargar las variables de entorno
const { PORT, HOST } = require('./config/env.config.js');
// Importa el módulo 'cors' para agregar los cors
const cors = require("cors");
// Importa el módulo 'express' para crear la aplicacion web
const express = require("express");
// Importamos morgan para ver las peticiones que se hacen al servidor
const morgan = require("morgan");
// Importa el módulo 'cookie-parser' para manejar las cookies
const cookieParser = require("cookie-parser");
/** El enrutador principal */
const indexRoutes = require("./routes/index.routes.js");
// Importa el archivo 'db.config.js' para crear la conexión a la base de datos
const { setupDB } = require("./config/db.config.js");
// Importa el handler de errores
const { handleFatalError, handleError} = require("./utils/errorHandler");
const { createPersons, createRoles, createRequirements } = require("./config/initialSetup.js");


async function setupServer(){
  try {
    // Instancia de una aplicacion express en "server"
    const server = express();
    // Middleware para el manejo de datos en formato JSON
    server.use(express.json());
    // Middleware cors
    server.use(cors("*"));
    // Middleware para el manejo de cookies
    server.use(cookieParser());
    // Agregamos morgan para ver las peticiones que se hacen al servidor
    server.use(morgan("dev"));
    // Agrega el middleware para el manejo de datos en formato URL
    server.use(express.urlencoded({ extended: true }));
    // Agrega el enrutador principal al servidor
    server.use("/api", indexRoutes);

    server.listen(PORT, () => {
      console.log(`Server running on http://${HOST}:${PORT}/api`);
    })
  } catch (error) {
    handleError(error, "/server.js -> setupServer()")
  }
}

async function setupAPI(){
  try {
    // Inicia la conexión a la base de datos
    await setupDB();
    // Inicia el servidor web
    await setupServer();
    // Inicia la creación de los roles
    await createRoles();
    // Inicia la creación del usuario admin y user
    await createPersons();
    // Inicia la creacion/actualizacion de los requerimientos
    await createRequirements();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));
