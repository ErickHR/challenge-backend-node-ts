import { Types } from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  sku: string;
  accountId: Types.ObjectId;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}
