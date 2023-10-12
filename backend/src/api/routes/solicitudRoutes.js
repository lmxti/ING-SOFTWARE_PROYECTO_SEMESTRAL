import { Router } from "express";
const api = Router();
import solicitudController from "../controller/solicitudController.js";

api.post("/crearSolicitud", solicitudController.crearSolicitud);
api.delete("/eliminarSolicitud/:id", solicitudController.eliminarSolicitud);

export default api;