import { Request, Response, NextFunction } from 'express'
import { IUser } from '../../models/User/types';
import ApiError from '../classes/APIError';
import { IUserRequest } from '../types/IUserRequest'

export function authorizeRole(...roles: number[]) {
  return function (request: IUserRequest, response: Response, next: NextFunction) {
    const currentUserRole: number = request.user.role;

    if (!roles.includes(currentUserRole)) return next(new ApiError('Access denied', 403));

    next();
  }
}