import Product from "./models/products";

export async function createProduct(req, res) {
  try {
    if (!req.body) {
      res.status(400).json({ error: "No Product Data submitted!" });
    }
    const { name, price, stock, images, description, seller, category } =
      req.body;

    const product = new Product({
      name,
      price,
      stock,
      images,
      description,
      category,
      seller,
    });

    await product.save()
    res.status(201).json(product, { success: true });
  } catch (error) {
    res.status(400).json({ error: "Error Creating Product" });
  }
}

export async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(404).json({ error: "No  Found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: "Error Fetching Products!" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.body.id);
    if (!product) {
      res.status(404).json({ error: "Product not found!" });
    }
    res.status(200).json({ message: "Product deleted Successfully", product });
  } catch (error) {
    res.status(400).json({ error: "Error deleting Product data" });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.query.id);
    if (!product) {
      res.status(404).json({ error: "Product not found!" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: "Error fetching Product data" });
  }
}
