import { NextFunction, Request, Response } from "express";
import { IResponseMessage } from "../models/shared";

import User from "../models/User";
import { ICreateUserDTO, IUser } from "../models/User/types";
import ApiError from "../utils/classes/ApiError";
import asyncHandler from "../utils/middlewares/asyncHandler";

/**
 * @description Create an user.
 * @route POST /users.
 * @access PRIVATE, only admin and super admin.
 */
const create = asyncHandler(
  async (request: Request<null, string, ICreateUserDTO, null>, response: Response<IResponseMessage>, next: NextFunction) => {
    const user = request.body;

    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      next(new ApiError("User already exists", 500));
      return;
    }

    await User.create(user);
    response.json({ message: "User created successfully." });
  }
);

const getAll = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const users: IUser[] = await User.find({});

  response.status(200).json({ users });
});

export { create, getAll };
