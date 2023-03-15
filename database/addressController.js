import updateAddress from "@/pages/address/[id]";
import Shipping from "./models/shipping";
import User from "./models/user";

export async function createAddress(req, res) {
  try {
    if (!req.body) {
      res.status(400).json({ error: "No Shipping Address Provided" });
    }

    const user = await User.findById(req.query.id);
    const address = await Shipping.create(req.body);

    address.owner.push(user._id);
    await address.save();

    user.shippingAddress.push(address);
    await user.save();

    res.status(201).json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Shipping Address" });
  }
}

export async function getAddress(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      res.status(400).json({ error: "No Address Id Provided" });
    }

    const address = await Shipping.findById(id);

    if (!address) {
      res.status(404).json({ error: "Shipping Address Not Found" });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: "Error Fetching Shipping Address" });
  }
}

export async function updateAdd(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      res.status(400).json({ error: "No Address Id Provided" });
    }

    if (!req.body) {
      res.status(400).json({ error: "No Shipping data provided" });
    }
    const data = req.body;

    const updatedAddress = await Shipping.findByIdAndUpdate(id, data);
 

    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ error: "Error Updating Shipping Address" });
  }
}

export async function deleteAddress(req, res) {
  try {
    const id = req.query.id;
    if (!id) {
      res.status(400).json({ error: "No Address Id Provided" });
    }

    const deleted = await Shipping.findByIdAndDelete(id);
    res.status(200).json({
      message: "Shipping Address Deleted Successfully",
      deleted: deleted,
    });
  } catch (error) {}
}
