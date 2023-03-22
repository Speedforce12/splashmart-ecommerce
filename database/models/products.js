import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: {
      type: [String],
    },
    

    category: {
      type: String,
      required: true,
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
        ],
      },
    },
    seller: { type: String, required: true },
    stock: { type: Number, required: true },
    reviews: [
      {
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        createAt: { type: Date, default: Date.now },
      },
    ],
    ratings: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);

export default Product;
