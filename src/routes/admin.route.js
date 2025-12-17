import { Router } from "express";

import controller from "../controllers/admin.controller.js";
import { validator } from "../middlewares/validation.handle.js";
import adminValid from "../validation/user.validation.js";

const router = Router();

router
    .post('/', validator(adminValid.create), controller.create)
    


export default router;
 