import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { ILoginDTO, IUser } from "../models/User/types";
import ApiError from "../utils/classes/ApiError";
import asyncHandler from "../utils/middlewares/asyncHandler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = asyncHandler(
  async (request: Request<null, {}, ILoginDTO, null>, response: Response<{ token: string }>, next: NextFunction) => {
    const email: string = request.body.email;
    const password: string = request.body.password;

    const user: IUser = await User.findOne({ email }).select("password");
    if (!user) {
      next(new ApiError("Incorrect credentials", 500));
      return;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      next(new ApiError("Incorrect credentials", 500));
      return;
    }

    const token: string = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "1d" });
    response.status(200).json({ token });
  }
);

export { login };
