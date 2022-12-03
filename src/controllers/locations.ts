import { NextFunction, Request, Response } from "express"

import Location from "../models/Location"
import asyncHandler from "../utils/middlewares/asyncHandler"
import { IUserRequest } from "../utils/types/IUserRequest"
import { IResponseMessage } from "../models/shared"
import { ILocation } from "../models/Location/types"

/**
 * @route POST /api/locations.
 * @description Create a location.
 * @access SUPER_ADMIN, ADMIN.
 */
const create = asyncHandler(async (request: IUserRequest, response: Response<IResponseMessage>, next: NextFunction) => {
  const { name } = request.body;
  await Location.create({
    name,
    createdBy: request.user._id,
  });

  response.status(200).json({ message: 'Location created successfully' });
});

/**
 * @route GET /api/locations.
 * @description get all locations.
 * @access SUPER_ADMIN, ADMIN.
 */
const getAll = asyncHandler(async (request: IUserRequest, response: Response<ILocation[]>, next: NextFunction) => {
  const categories: ILocation[] = await Location.find({});

  response.status(200).json(categories);
});

export { create, getAll };
