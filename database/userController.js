import User from "./models/user";
import { hash } from "bcrypt";
import sendMail from "@/helper/sendMail";
import randomstring from "randomstring";

export async function createUser(req, res) {
  try {
    // check if data is provided
    if (!req.body) {
      res.status(400).json({ error: "No Data Provided" });
    }

    const { name, password, email } = req.body;

    const user = await User.findOne({ email: email });

    // check if user already exists
    if (user) {
      res.status(409).json({ error: "User already exists" });
    }

    const token = randomstring.generate({ length: 36 ,charset: "hex"});
    const newUser = await User.create({
      name: name,
      email: email,
      password: await hash(password, 16),
      verificationToken: token,
    });

    try {
      sendMail(email, token);
    } catch (error) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error sending verification email" });
    }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error Creating User" });
  }
}
