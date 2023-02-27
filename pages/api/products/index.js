import connectDB from "@/database/connection";
import { createProduct, getProducts } from "@/database/productControllers";

export default function handler(req, res) {
  connectDB().catch(() => {
    res.status(500).json({ error: "Error in Database connect" });
  });

  const { method } = req;

  switch (method) {
    case "GET":
      getProducts(req,res);
      break;

    case "POST":
      createProduct(req, res);
      break;

    default:
      res.setHeader(
        "Allow",
        ["GET", "POST", "DELETE", "PATCH"],
        "Content-Type",
        "application/json"
      );
      res.status(405).end(`method ${method} Not allowed`);
  }
}
