import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    role: { type: String, default: "customer" },
    password: String,
    avatar: String,
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    shippingAddress: [{
      type: Schema.Types.ObjectId,
      ref: "Shipping",
    }],
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
