import { Router } from "express";

import adminRoutes from "./admin.route.js";
import deliveryRoutes from "./delivery.route.js";
import reviewRoutes from "./review.route.js";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/delivery", deliveryRoutes);
router.use("/review", reviewRoutes);

export default router;
