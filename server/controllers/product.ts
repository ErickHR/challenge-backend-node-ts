import mongoose from "mongoose";
import Products from "../models/products";
import { IProduct } from "../interfaces/product";
import { IResponseGet } from "../interfaces/pagination-response";

export class ProductController {

  static async countDocuments(query: any): Promise<number> {
    const products = await Products.countDocuments(query);
    return products;
  }

  static async findByAccountId({ page = 1, limit = 10, accountId = '' }): Promise<IResponseGet<IProduct>> {
    console.log('adasdasdasd')
    const query: any = {};
    if (accountId) {
      query.accountId = accountId;
    }

    if (page < 1) {
      page = 1;
    }

    if (limit < 1) {
      limit = 1
    }

    const tes = await Products.countDocuments(query)
    console.log(tes)

    const [total, products] = await Promise.all([
      Products.countDocuments(query),
      Products.find(query).skip((page - 1) * limit).limit(limit)
    ])

    const totalPage = Math.ceil(total / limit);
    const nextPage = page + 1 > totalPage ? null : page + 1;
    const previousPage = page - 1 < 1 ? null : page - 1;

    return {
      meta: {
        totalItems: total,
        totalPage: totalPage,
        previousPage,
        nextPage: nextPage,
        currentPage: page,
      },
      data: products,
    };
  }


  static async findById(id: string): Promise<IProduct> {
    const product = await Products.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  }

  static async create(data: any): Promise<IProduct> {
    const product = await Products.create(data);
    return product;
  }

  static async productExists(id: string, accountId: string): Promise<IProduct> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Error invalid product ID");
    const product = await Products.findOne({ _id: id, accountId });
    if (!product) throw new Error("Product not found");
    return product;
  }

  static async purchaseProduct(product: IProduct) {
    product.stock -= 1;
    if (product.stock < 0) {
      throw new Error("Insufficient product quantity");
    }

    await Products.updateOne({ _id: product._id }, { stock: product.stock });
  }


}