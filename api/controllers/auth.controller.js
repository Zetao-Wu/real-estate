import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    // 201 User Created
    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
