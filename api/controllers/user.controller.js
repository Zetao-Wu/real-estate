import { errorHandler } from "../utils/error.js";
import User from '../models/user.model.js'
import bcrypt from "bcrypt";

export const test = (req, res) => {
  res.json({
    message: "API Route is working",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account"));
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    // Finding the ID in the databse and updating the user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        // we will need to get the old information as well, the $set will limit the input fields that is required so peopel can't directly setAdmin to true or something similar
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};
