import { Router } from "express";
import controller from "../controllers/delivery.controller.js";
import deliveryValid from "../validations/delivery.validation.js";
import { validator } from "../middlewares/validation.handle.js";

const router = Router();

router
  .post("/", validator(deliveryValid.create), controller.create)
  .get("/", controller.findAll)
  .get("/:id", controller.findOne)
  .patch("/:id", validator(deliveryValid.update), controller.update)
  .delete("/:id", controller.remove);

export default router;
