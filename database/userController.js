import User from "./models/user";
import { compare, hash } from "bcrypt";
import sendMail from "@/helper/sendMail";
import randomstring from "randomstring";
import Shipping from "./models/shipping";

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

    const token = randomstring.generate({ length: 36, charset: "hex" });
    const newUser = await User.create({
      name: name,
      email: email,
      password: await hash(password, 16),
      verificationToken: token,
    });

    try {
      const to = email;
      const subject = "Verify email";
      const html = `
     <p>
      Please click
              <a href='${process.env.NEXTAUTH_URL}/verify/${token}'>here</a> to
              verify your account
            </p>;

    `;

      sendMail(to, subject, html);
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

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.query.id).populate("shippingAddress");

    if (!user) {
      res.status(404).json({ error: " User not found " });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting user" });
  }
}

export async function updatePass(req, res) {
  try {
    const user = await User.findById(req.query.id);
    if (!user) {
      res.status(404).json({ error: " User not found " });
    }

    if (!req.body) {
      res.status(400).json({ error: "No data Provided" });
    }
    const { password } = req.body;

    const checkedpassword = await compare(user.password, cpassword);

    if (!checkedpassword) {
      res.status(404).json({ error: "provided information is invalid" });
    }

    user.password = await hash(password, 16);
    await user.save();

    res.status(200).json({ success: "Updated password successfully " }, user);
  } catch (error) {
    res.status(500).json({ error: "Error updating password" });
  }
}

export async function updateUser(req, res) {
  const id = req.query.id;

  try {
    const { name, avatar } = req.body;

    if (!req.body) {
      res.status(400).json({ error: "No data Provided!" });
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ error: "User Doesn't Exist" });
    }

    user.name = name;
    user.avatar = avatar;

    await user.save();

    res.status(200).json({ message: "Successfully Updated Profile, changes will take affect when you sign back in" });
  } catch (error) {
    res.status(500).json({ error: "Error Updating user" });
  }
}
