// Express y funcion 'json' para configurar y manejar solicitudes
import express, { json } from "express";
// Instancia de la aplicacion express en 'app'
const app = express();
// Numero de puerto para la aplicacion
const port = 3000;

// Importacion de funcion que conecta la base de datos
import { setupDB } from "./config/db.config.js";

// Importacion de rutas de modelo 'Person'
import personRoutes from "./api/routes/person.routes.js";
// Importacion de rutas de modelo 'Grant'
import grantRoutes from "./api/routes/grant.routes.js";

// Middleware
app.use(json());
app.use('/api/persons', personRoutes);
app.use('/api/grants', grantRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`API en la url http://localhost:${port}`);
  setupDB();
});
