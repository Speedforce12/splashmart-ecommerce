import { Schema, models, model } from "mongoose";

const shippingSchema = new Schema(
  {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    phone: String,
  },
  { timestamps: true }
);

const Shipping = models.Shipping || model("Shipping", shippingSchema);
export default Shipping;
