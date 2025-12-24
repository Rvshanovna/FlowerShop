import { BaseController } from "./base.controller.js";
import Order from "../schemas/order.schema.js";
import OrderItem from "../schemas/order_items.js";
import Product from "../schemas/product.schema.js";

import { catchAsync } from "../middlewares/catch-async.js";
import { successRes } from "../utils/success-res.js";
import { ApiError } from "../utils/api.error.js";

class OrderController extends BaseController {
    constructor() {
        super(Order, ["items", "delivery", "customerId"]);
    }

    create = catchAsync(async (req, res) => {
        const { customerId, address, items } = req.body;

        let calculatedTotal = 0;
        const newOrder = await Order.create({
            customerId,
            address,
            status: "pending",
            totalPrice: 0
        });
        for (const item of items) {
            const product = await Product.findOneAndUpdate(
                { _id: item.productId, stock: { $gte: item.quantity } },
                { $inc: { stock: -item.quantity } },
                { new: true }
            );

            if (!product) {
                throw new ApiError(
                    `Product is out of stock or not found: ${item.productId}`,
                    400
                );
            }

            await OrderItem.create({
                orderId: newOrder._id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            });

            calculatedTotal += product.price * item.quantity;
        }
        newOrder.totalPrice = calculatedTotal;
        await newOrder.save();

        return successRes(res, newOrder, 201);
    });

    updateStatus = catchAsync(async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id).populate("items");
        if (!order) {
            throw new ApiError("Order not found", 404);
        }

        if (status === "canceled" && order.status !== "canceled") {
            for (const item of order.items) {
                await Product.findByIdAndUpdate(item.productId, {
                    $inc: { stock: item.quantity }
                });
            }
        }

        order.status = status;
        await order.save();

        return successRes(res, order);
    });
}

export default new OrderController();
