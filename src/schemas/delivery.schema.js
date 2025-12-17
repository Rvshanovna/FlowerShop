import mongoose, { Schema, model } from "mongoose";

const deliverySchema = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    orderId: { ref: "Order", type: mongoose.Schema.Types.ObjectId },
    userId: { ref: "User", type: mongoose.Schema.Types.ObjectId }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Delivery", deliverySchema);
