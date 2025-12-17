import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    totalPrice: { type: Number },
    status: {
      type: String,
      enum: ["pending", "paid", "delivering", "delivered", "canceled"]
    },
    address: { type: String }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// virtuals
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
