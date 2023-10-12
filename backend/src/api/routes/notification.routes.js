import { Router } from "express";
import { 
    createNotification, 
    getNotifications,
    updatedNotification,

} from "../controllers/notification.controller.js";

const router = Router();

router.post("/", createNotification);
router.get("/", getNotifications);
router.put("/:id", updatedNotification);//la id del usuario puede cambiarse por su rut u otra manera de reconocerlo


export default router;