// Importamos los modulos a utilizar
import { Router } from "express";
import usuarioController from "../controller/usuarioController.js";

// Crear una instancia de Router
const api = Router();

// Definir las rutas
api.post("/crearUsuario", usuarioController.crearUsuario);
api.delete("/eliminarUsuario/:id", usuarioController.eliminarUsuario);
api.get("/obtenerUsuarios", usuarioController.obtenerUsuarios);
api.put("/actualizarUsuario/:id", usuarioController.actualizarUsuarioID);

// Exportar las rutas
export default api;