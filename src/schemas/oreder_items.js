import mongoose, { Schema, model } from "mongoose";

const orderItemSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: { type: Number },
    price: { type: Number }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("OrderItem", orderItemSchema);
