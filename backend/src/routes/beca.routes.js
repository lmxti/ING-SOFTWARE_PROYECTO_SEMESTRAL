import {Router} from "express";
import {
    createBeca,
    deleteBeca,
    updateBeca,
    getBeca,
}
from "../controller/usersController.js"

const router = Router();

router.post("/", createBeca);
router.delete("/:userDel", deleteBeca);
router.put("/:userMod", updateBeca);
router.get("/:userGet", getBeca);

module.exports = router;