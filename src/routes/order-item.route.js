import { Router } from "express";
import controller from "../controllers/order-item.controller.js";
import OrderItemValid from "../validation/order-item.validation.js";
import { validator } from "../middlewares/validation.handle.js";

const router = Router();

router.post("/", validator(OrderItemValid.create), controller.create)
    .get("/", controller.findAll)
    .get("/:id", controller.findOne)
    .put("/:id", validator(OrderItemValid.update), controller.update)
    .delete("/:id", controller.remove);

export default router;
