import { Request } from "express";
import { IUser } from "../../models/User/types";

export interface IUserRequest extends Request {
  user: IUser;
}