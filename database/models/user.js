import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    emailToken: String,
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
