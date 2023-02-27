import connectDB from "@/database/connection";
import User from "@/database/models/user";
import { verify } from "jsonwebtoken";

export default async function verifyEmail(req, res) {
    connectDB().catch(() => {
      res.status(500).json({ error: "Error in Database connect" });
    });

  try {
    if (req.method === "PUT") {
      const { token } = req.query;

      if (token) {
        const decoded = await verify(token, process.env.NEXTAUTH_SECRET);
        req.user = decoded;
        res.status(404).json({ error: "No Token Provided" });
      }

      if (!token) {
        return res.status(404).json({ message: "no Token Provided" });
      }

      const user = await User.findById(req.user._id);

      if (user) {
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        res.status(200).json({ user });
      } else {
        res
          .status(404)
          .json({ error: "Email verification failed, Invalid Token" });
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}
