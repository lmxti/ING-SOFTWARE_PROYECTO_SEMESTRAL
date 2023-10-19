// Importamos los modulos a utilizar
import {Router} from "express";
import becaController from "../controller/becaController.js";

// Crear una instancia de Router
const api = Router();

// Definir las rutas
api.post("/crearBeca", becaController.crearBeca);
api.delete("/eliminarBeca/:id", becaController.eliminarBeca);
api.get("/obtenerBecas", becaController.obtenerBecas);
api.put("/actualizarBeca/:id", becaController.actualizarBecaID);

// Exportar las rutas
export default api;