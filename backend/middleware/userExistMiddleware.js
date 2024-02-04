import fs from "fs/promises";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const userExists = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!req.file?.fieldname) {
    throw new Error(`No Image Exists`);
  }

  const isEmailExist = await User.findOne({ email });

  if (isEmailExist) {
    await fs.unlink(req.file?.path);

    throw new Error(`User email already exists!`);
  }

  next();
});

export { userExists };
