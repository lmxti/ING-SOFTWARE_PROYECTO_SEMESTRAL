import {Router} from "express";
import {
    createUser
}
from "../controller/usersController.js"

const router = Router();

router.post("/", createUser);

module.exports = router;