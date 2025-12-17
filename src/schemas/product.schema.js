import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    color: { type: String },
    image: { type: String },
    isAvailable: { type: Boolean },
    quantity: { type: Number }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// virtuals
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId"
});

productSchema.virtual("orderItems", {
  ref: "OrderItem",
  localField: "_id",
  foreignField: "productId"
});

export default model("Product", productSchema);
