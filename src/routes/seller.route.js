import { Router } from "express";
import SellerController from "../controllers/seller.controller.js";
import { authGuard } from "../guards/auth-token.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/index.js";
import { validator } from "../middlewares/validation.handle.js";
import userValid from "../validation/user.validation.js";

const router = Router();

router
    .post('/', authGuard, roleGuard(Roles.ADMIN, Roles.SUPERADMIN), validator(userValid.create), SellerController.create)
    .get('/', authGuard, roleGuard(Roles.ADMIN, Roles.SUPERADMIN), SellerController.findAll)
    .get('/:id', authGuard, roleGuard(Roles.ADMIN, Roles.SUPERADMIN), SellerController.findOne)
    .patch('/:id', authGuard, roleGuard(Roles.ADMIN, Roles.SUPERADMIN), validator(userValid.update), SellerController.update)
    .delete('/:id', authGuard, roleGuard(Roles.ADMIN, Roles.SUPERADMIN), SellerController.remove)

export default router;

