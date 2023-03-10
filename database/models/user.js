import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    role: { type: String, default: "customer" },
    password: {
      type: String,
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
