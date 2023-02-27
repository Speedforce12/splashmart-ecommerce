import connectDB from "@/database/connection";
import { createUser } from "@/database/userController";

export default function (req, res) {
  connectDB().catch(() => {
    res.status(500).json({ error: "Error in Database connect" });
  });

  const { method } = req;

  switch (method) {
    case "POST":
      createUser(req, res);
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
