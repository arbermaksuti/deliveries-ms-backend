import { IBase } from "../Base/types";

export interface ICreateProductDto extends IProduct, IBase {
}

export interface IProduct {
  name: string;
  description: string;
  price: string;
  category: string;
}
