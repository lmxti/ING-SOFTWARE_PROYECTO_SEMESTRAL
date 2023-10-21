import {Router} from "express";
import {
    createUser,
    deleteUser,
    updateUser,
    getUser,
}
from "../controller/usersController.js"

const router = Router();

router.post("/", createUser);
router.delete("/:userDel", deleteUser);
router.put("/:userMod", updateUser);
router.get("/:userGet", getUser);

module.exports = router;