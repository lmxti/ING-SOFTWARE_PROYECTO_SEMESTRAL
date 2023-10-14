// Express y funcion 'json' para configurar y manejar solicitudes
import express, { application, json } from "express";
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
// Importacion de rutas de modelo 'Application'
import applicationRoutes from "./api/routes/application.routes.js";

// Middleware
app.use(json());
app.use('/api/persons', personRoutes);
app.use('/api/grants', grantRoutes);
app.use('/api/applications', applicationRoutes);



app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`API en la url http://localhost:${port}`);
  setupDB();
});
