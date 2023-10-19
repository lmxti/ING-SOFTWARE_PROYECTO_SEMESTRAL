// Importamos los modulos a utilizar
import { Router } from "express";
import solicitudController from "../controller/solicitudController.js";

// Crear una instancia de Router
const api = Router();

// Definir las rutas
api.post("/crearSolicitud", solicitudController.crearSolicitud);
api.delete("/eliminarSolicitud/:id", solicitudController.eliminarSolicitud);

// Exportar las rutas
export default api;