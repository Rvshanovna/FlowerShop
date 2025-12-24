import { BaseController } from "./base.controller.js";
import Product from "../schemas/product.schema.js";
import { catchAsync } from "../middlewares/catch-async.js";
import Order from "../schemas/order.schema.js";
import OrderItem from "../schemas/order_items.js";
import { successRes } from "../utils/success-res.js";
import { ApiError } from "../utils/api.error.js";

class OrderItemController extends BaseController{
    constructor(){
        super(OrderItemController,["productId","orderId"])
    }

    remove = catchAsync(async(req, res)=>{
        const {id} = req.params;
        const item = await this._getById(id)

        await Product.findByIdAndUpdate(item.productId,{
            $inc:{stock: item.quantity}
        })

        await Order.findByIdAndUpdate(item.orderId,{
            $inc:{totalPrice: -(item.price * item.quantity)}
        })

        await OrderItem.findByIdAndDelete(id)
        return successRes(res, {}, 204)
    })

    update = catchAsync(async(req, res)=>{
        const {id} = req.params;
        const {quantity} = req.body;

        if(!quantity || quantity<1){
            throw new ApiError('Quantity must be at least 1',400)
        }

        const oldItem = await this._getById(id)
        const product = await Product.findById(oldItem.productId)

        const diff = quantity - oldItem.quantity
        if(diff > 0 && product.stock <diff){
            throw new ApiError('There is not enough product in the warehouse',400)
        }

        await Product.findByIdAndUpdate(oldItem.productId,{
            $inc:{stock: -diff}
        })
        await Order.findByIdAndUpdate(oldItem.orderId,{
            $inc:{totalPrice: diff * oldItem.price}
        })

        const updatedItem = await OrderItem.findByIdAndUpdate(
            id,
            {quantity},
            {new:true, runValidators: true}
        )

        return successRes(res, updatedItem)
    })
}

export default new OrderItemController()
