import { Router } from "express";
import controller from "../controllers/customer.controller.js"; // .js yozishni unutmang

const router = Router();

router.post("/signup", controller.create);
router.post("/signin", controller.signIn);
router.post("/otp", controller.confirmOTP);

export default router;




