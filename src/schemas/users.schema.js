import mongoose, { Schema, model } from "mongoose";
import { Genders, Roles } from "../enums/index.js";

const userSchema = new Schema(
  {
    fullName: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true},
    hashedPassword: { type: String, required: true },
    address: { type: String },
    image: { type: String },
    gender: { type: String, enum: [Genders.MALE, Genders.FEMALE] },
    isActive: { type: Boolean, default: true },
    role: {
    type: String,
    enum: [
      Roles.SUPERADMIN, 
      Roles.ADMIN, 
      Roles.SELLER,
      Roles.CUSTOMER
    ],
  required: true,
  default: Roles.CUSTOMER
},
    isEmailVerified: { type: Boolean }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// virtuals
userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "customerId"
});

userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "customerId"
});

userSchema.virtual("deliveries", {
  ref: "Delivery",
  localField: "_id",
  foreignField: "userId"
});

export default model("User", userSchema);
