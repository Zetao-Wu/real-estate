import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    // 201 User Created
    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(errorHandler(404, "User Not Found"));
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Incorrect Credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // because we do not want to return the password as part of the return output, we will deconstruct the validUser such that the password key-value will be left out and we will return the rest of the data
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};


export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out')
  } catch(err) {
    next(err)
  }
}