import { IProduct } from "../Product/types";

export interface ICreateOrderDTO {
  products: ICreateOrderItem[];
  location: string;
  customerName: string;
  customerAddress: string;
  customerNumber: string;
}

export interface ICreateOrderItem {
  productId: string;
  quantity: number;
}