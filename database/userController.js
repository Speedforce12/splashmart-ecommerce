import User from "./models/user";
import { hash } from "bcrypt";
import sendMail from "@/helper/sendMail";
import cryptoRandomString from "crypto-random-string";
import { sign } from "jsonwebtoken";

export async function createUser(req, res) {
  try {
    // check if data is provided
    if (!req.body) {
      res.status(400).json({ error: "No Data Provided" });
    }

    const { username, password, email } = req.body;

    const user = await User.findOne({ email: email });

    // check if user already exists
    if (user) {
      res.status(409).json({ error: "User already exists" });
    }

    // create a unique token to identify the user

    const newUser = await User.create({
      username: username,
      email: email,
      password: await hash(password, 16),
    });

    const token = sign({ _id: newUser._id }, process.env.NEXTAUTH_SECRET, {
      expiresIn: "1h",
    });

    newUser.emailToken = token;
    await newUser.save();

    const link = `http://localhost:3000/confirmation/${token}`;
    const message = `<div>Click on the link below to verify your email, if the link is not working then please paste into the browser.</div></br>
    <div><a href=${link}>Verify Email</a></div>`;

    await sendMail({
      to: newUser.email,
      subject: "Confirm Email",
      text: message,
    });
    res.status(201).json({
      message: `Email sent to ${newUser.email}, please check your email`,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Error Creating User" });
  }
}
