import { Router } from "express";
import controller from "../controllers/order.controller.js";
import OrderValid from "../validation/order.validation.js";
import { validator } from "../middlewares/validation.handle.js";

const router = Router();

router.post("/", validator(OrderValid.create), controller.create)
    .get("/", controller.findAll)
    .get("/:id", controller.findOne)
    .put("/:id", validator(OrderValid.update), controller.update)
    .delete("/:id", controller.remove);

export default router;
