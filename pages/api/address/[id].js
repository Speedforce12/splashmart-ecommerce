import { deleteAddress, getAddress } from "@/database/addressController";
import connectDB from "@/database/connection";

export default function handler(req, res) {
  connectDB().catch(() => {
    res.status(500).json({ error: "Error in Database connect" });
  });

  const { method } = req;

  switch (method) {
    case "GET":
      getAddress(req, res);
      break;

    case "DELETE":
      deleteAddress(req, res);
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
