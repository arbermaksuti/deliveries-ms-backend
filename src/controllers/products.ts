import Product from "../models/Product";
import asyncHandler from "../utils/middlewares/asyncHandler";
import ApiError from "../utils/classes/ApiError";
import { NextFunction, Request, Response } from "express";
import { ICreateProductDto } from "../models/Product/types";
import { IResponseMessage } from "../models/shared";
import { IUserRequest } from "../utils/types/IUserRequest";

const create = asyncHandler(
  async (request: IUserRequest, response: Response<IResponseMessage>, next: NextFunction) => {
    const product = request.body;

    await Product.create({ ...product, createdBy: request.user._id });

    response.json({ message: "Product created successfully." });
  }
);

const getAll = asyncHandler(async (request: Request, response: Response<any[]>, next: NextFunction) => {
  const products = await Product.find({});

  response.json(products);
});

const updatePrice = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { productId, price } = request.body;

  const product = await Product.findById(productId);
  if (!product) {
    next(new ApiError("Product doesn't exists.", 404));
    return;
  }

  product["oldPrice"] = product.price;
  product["price"] = price;
  await product.save();

  response.json(product);
});

const deleteOne = asyncHandler(async (request: Request, response: Response<IResponseMessage>, next: NextFunction) => {
  const { productId } = request.params;

  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    next(new ApiError("Product doesn't exists", 404));
    return;
  }

  response.json({ message: "Product deleted successfully" });
});

const getOne = asyncHandler(async (request: Request, response: Response<IResponseMessage>, next: NextFunction) => {
  const { productId } = request.params;

  const product = await Product.findById(productId);
  if (!product) {
    next(new ApiError("Product doesn't exists", 404));
    return;
  }

  response.json({ message: "Product deleted successfully" });
});

export { create, getAll, getOne, updatePrice, deleteOne };
