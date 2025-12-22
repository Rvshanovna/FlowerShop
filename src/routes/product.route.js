import { Router } from "express";

import controller from '../controllers/product.controller.js';
import { validator } from '../middlewares/validation.handle.js';
import productValid from '../validation/product.validation.js';

const router = Router();

router
    .post('/', validator(productValid.create), controller.create)
    .get('/', controller.findAll)
    .get('/:id', controller.findOne)
    .patch('/:id', validator(productValid.update), controller.update)
    .delete('/:id', controller.remove)

export default router;