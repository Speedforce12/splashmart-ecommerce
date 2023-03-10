import { Schema, models, model } from "mongoose";

const orderSchema = new Schema(
  {
    name: String,
    address: Object,
    products: Object,
    email: String,
    status: { type: String, default: "Processing" },
  },
  { timestamps: true }
);

const Order = models.Order || models("Order", orderSchema);
export default Order;
