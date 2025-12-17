import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

categorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "categoryId"
});

export default model("Category", categorySchema);
