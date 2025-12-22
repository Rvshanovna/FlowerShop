import { Router } from "express";
import controller from "../controllers/review.controller.js";
import reviewValid from "../validation/review.validation.js";
import { validator } from "../middlewares/validation.handle.js";

const router = Router();

router
  .post("/", validator(reviewValid.create), controller.create)
  .get("/", controller.findAll)
  .get("/:id", controller.findOne)
  .patch("/:id", validator(reviewValid.update), controller.update)
  .delete("/:id", controller.remove);

export default router;
