import { NextFunction, Request, Response } from "express";

import ApiError from "../classes/APIError";
import { verify, decode, JwtPayload } from 'jsonwebtoken';
import User from "../../models/User";
import { IUser } from "../../models/User/types";
import { IUserRequest } from '../types/IUserRequest'

export async function authorize(request: IUserRequest, response: Response, next: NextFunction) {
  const authorization: string = request.headers.authorization;
  if (!authorization) return next(new ApiError('Unauthorized!', 401));

  if (!authorization.includes("Bearer")) return next(new ApiError('Unauthorized!', 401));

  const [, token] = authorization.split(' ');
  if (!token) return next(new ApiError('Unauthorized!', 401));

  try {
    verify(token, process.env.PRIVATE_KEY)
  } catch {
    return next(new ApiError('Unauthorized', 401));
  }

  const decodedToken: any = decode(token);
  const user: IUser = await User.findById(decodedToken._id);
  request.user = user;

  next();
}