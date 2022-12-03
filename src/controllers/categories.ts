import { NextFunction, Request, Response } from "express"

import Category from "../models/Category"
import { ICategory, ICreateCategoryDTO } from '../models/Category/types'
import asyncHandler from "../utils/middlewares/asyncHandler"
import { IUserRequest } from "../utils/types/IUserRequest"
import { IResponseMessage } from "../models/shared"

/**
 * @route POST /api/categories.
 * @description Create a category.
 * @access SUPER_ADMIN, ADMIN.
 */
const create = asyncHandler(async (request: IUserRequest, response: Response<IResponseMessage>, next: NextFunction) => {
  const { description, name } = request.body;
  await Category.create({
    name,
    description,
    createdBy: request.user._id,
  });

  response.status(200).json({ message: 'Category created successfully' });
});

/**
 * @route GET /api/categories.
 * @description get all categories.
 * @access SUPER_ADMIN, ADMIN.
 */
const getAll = asyncHandler(async (request: IUserRequest, response: Response<ICategory[]>, next: NextFunction) => {
  const categories: ICategory[] = await Category.find({});

  response.status(200).json(categories);
});

export { create, getAll };
