import Product from "./models/products";

export async function createProduct(req, res) {
  try {
    if (!req.body) {
      res.status(400).json({ error: "No Product Data submitted!" });
    }
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(404).json({ error: "Error Creating Product" });
  }
}

export async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(404).json({ error: "No  Found" });
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).json({ error: "Error Fetching Products!" });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.query.id);
    if (!product) {
      res.status(404).json({ error: "Product not found!"  });
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(404).json({ error: "Error fetching Product data" });
  }
}
