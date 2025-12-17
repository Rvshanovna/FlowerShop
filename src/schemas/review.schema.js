import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    rating: { type: Number, min: 1, max: 5, },
    comment: { type: String }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Review", reviewSchema);
