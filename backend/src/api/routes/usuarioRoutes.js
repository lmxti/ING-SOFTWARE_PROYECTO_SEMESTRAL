import { Router } from "express";
const api = Router();
import usuarioController from "../controller/usuarioController.js";

api.post("/crearUsuario", usuarioController.crearUsuario);
api.delete("/eliminarUsuario/:id", usuarioController.eliminarUsuario);
api.get("/obtenerUsuarios", usuarioController.obtenerUsuarios);
api.put("/actualizarUsuario/:id", usuarioController.actualizarUsuarioID);

export default api;