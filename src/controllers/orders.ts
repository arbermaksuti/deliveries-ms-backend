import asyncHandler from "../utils/middlewares/asyncHandler";
import { Request, Response, NextFunction } from 'express';
import Order from "../models/Order";
import ApiError from "../utils/classes/APIError";
import { ICreateOrderItem } from "../models/Order/types";
import OrderItem from "../models/OrderItem";
import { IUserRequest } from "../utils/types/IUserRequest";
import Product from "../models/Product";

const getOne = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    const orderId: string = request.params.orderId;

    const order = await Order.findById(orderId);
    if (!order) return next(new ApiError('Order not found!', 404));

    response.status(200).json({ order });
  }
);

const create = asyncHandler(async (request: IUserRequest, response: Response, next: NextFunction) => {
  const products: ICreateOrderItem[] = request.body.products;
  const { customerName, customerAddress, customerNumber, description, discount } = request.body;

  const createdOrder = await Order.create({
    createdBy: request.user._id,
    status: 0,
    customerName, customerAddress, customerNumber, description
  });
  // createdOrder instaceof IOrder;

  let totalPrice: number = 0;
  for (let productItem of products) {
    const product = await Product.findById(productItem.productId);

    await OrderItem.create({
      product: productItem.productId,
      quantity: productItem.quantity,
      order: createdOrder._id,
      createdBy: request.user._id,
      price: productItem.quantity * product.price
    });

    totalPrice += productItem.quantity * product.price;
  }

  let deliveryCost: number;
  const minimumPriceForFreeDelivery: number = Number(process.env.MINIMUM_PRICE_FOR_FREE_DELIVERY);
  if (totalPrice >= minimumPriceForFreeDelivery) deliveryCost = 0;
  else deliveryCost = Number(process.env.DELIVERY_COST);

  let priceWithDiscount: number;
  if (discount && discount !== 0) {
    priceWithDiscount = totalPrice - (discount * totalPrice / 100);
  }

  createdOrder.price = totalPrice;
  createdOrder.discount = discount;
  createdOrder.deliveryCost = deliveryCost;
  createdOrder.priceWithDiscount = priceWithDiscount;
  createdOrder.totalPrice = priceWithDiscount + deliveryCost;
  await createdOrder.save();
});

export { getOne, create };