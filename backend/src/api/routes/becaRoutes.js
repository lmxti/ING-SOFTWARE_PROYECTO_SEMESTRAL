import {Router} from "express";
const api = Router();
import becaController from "../controller/becaController.js";

api.post("/crearBeca", becaController.crearBeca);
api.delete("/eliminarBeca/:id", becaController.eliminarBeca);
api.get("/obtenerBecas", becaController.obtenerBecas);
api.put("/actualizarBeca/:id", becaController.actualizarBecaID);

export default api;