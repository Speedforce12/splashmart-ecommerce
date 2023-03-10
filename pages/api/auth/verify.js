import connectDB from "@/database/connection";
import User from "@/database/models/user";

export default async function handler(req, res) {
  connectDB().catch(() => {
    res.status(500).json({ error: "Error in Database connect" });
  });

  if (req.method === "GET") {
    try {
      const { token } = req.query;
      const user = await User.findOne({ verificationToken: token });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.verificationToken !== token) {
        throw new Error("Invalid verification token");
      }

      user.verificationToken = null;
      user.isVerified = true;
      await user.save();

      res.redirect(`${process.env.NEXTAUTH_URL}/profile`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(400).json({ error: "Method not allowed" });
  }
}
