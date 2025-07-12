import mongoose from "mongoose";
import { IAccount } from "../interfaces/account";
import Accounts from "../models/accounts";
import { IResponseGet } from "../interfaces/pagination-response";


export class AccountController {

  static async countDocuments(query: any): Promise<number> {
    const accounts = await Accounts.countDocuments(query);
    return accounts;
  }


  static async findAll({ page = 1, limit = 10, name = '' }): Promise<IResponseGet<IAccount>> {

    const query: any = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (page < 1) {
      page = 1;
    }

    if (limit < 1) {
      limit = 1
    }

    const [total, accounts] = await Promise.all([
      Accounts.countDocuments(query),
      Accounts.find(query).skip((page - 1) * limit).limit(limit)
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
      data: accounts,
    };
  }


  static async findById(id: string): Promise<IAccount> {
    const account = await Accounts.findById(id);
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  }

  static async create(data: any): Promise<IAccount> {
    const account = await Accounts.create(data);
    return account;
  }

  static async existsAccount(id: string): Promise<IAccount> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Error invalid account ID");
    const account = await Accounts.findById(id);
    if (!account) throw new Error("Account not found");
    return account;
  }

}