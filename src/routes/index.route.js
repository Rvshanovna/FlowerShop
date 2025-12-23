import { Router } from 'express';


import adminRouter from "./admin.route.js";
import sellerRouter from "./seller.route.js";
import customerRouter from "./customer.auth.route.js";
import categoryRouter from './category.route.js';
import productRouter from "./product.route.js"
import deliveryRouter from "./delivery.route.js"
import reviewRouter from "./review.route.js";

const router = Router();

router
   .use('/admin', adminRouter)
   .use('/admin', adminRouter)
   .use('/seller', sellerRouter)
   .use('/customer', customerRouter)
   .use('/category', categoryRouter)
   .use('/product', productRouter)
   .use('/delivery', deliveryRouter)
   .use('/review', reviewRouter)
    
export default router;
