import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { authGuard } from "../guards/auth-token.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/index.js";
import { validator } from "../middlewares/validation.handle.js";

const router = Router();

router
    .post('/', authGuard, roleGuard(Roles.SELLER, Roles.SUPERADMIN), ProductController.create)
    .get('/', ProductController.findAll)
    .get('/:id', ProductController.findOne)
    .patch('/:id', authGuard, roleGuard(Roles.SELLER, Roles.SUPERADMIN), ProductController.update)
    .delete('/:id', authGuard, roleGuard(Roles.SELLER, Roles.SUPERADMIN), ProductController.remove)

export default router;
