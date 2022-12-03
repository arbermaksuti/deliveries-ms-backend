import { IBase } from "../Base/types";

export interface ICreateCategoryDTO extends ICategory {
}

export interface ICategory extends IBase {
  name: string;
  description: string;
}