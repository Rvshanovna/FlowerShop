import { Router } from "express";

import controller from "../controllers/category.controller.js";
import { validator } from "../middlewares/validation.handle.js";
import categoryValid from "../validation/category.validation.js";

const router = Router();

router
    .post('/', validator(categoryValid.create), controller.create)
    .get("/",controller.findAll)
    .get("/:id",controller.findOne)
    .patch("/:id",controller.update)
    .delete("/:id",controller.remove)


export default router;