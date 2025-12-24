import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "paid", "delivering", "delivered", "canceled"],
      default: "pending"
    },
    address: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

orderSchema.virtual("items", {
  ref: "OrderItem",
  localField: "_id",
  foreignField: "orderId"
});

orderSchema.virtual("delivery", {
  ref: "Delivery",
  localField: "_id",
  foreignField: "orderId",
  justOne: true
});

export default model("Order", orderSchema);
