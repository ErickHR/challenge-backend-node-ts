import { AccountController } from "../../controllers/account";
import { IAccount } from "../../interfaces/account";
import { PaginationDto } from "../../interfaces/pagination-request";
import { IResponseGet } from "../../interfaces/pagination-response";
import Accounts from "../../models/accounts";
import { Validator } from "../../utils/validation";

interface FilterDto {
  name?: string
}

interface InputAccountsQ {
  pagination: PaginationDto
  filter: FilterDto
}


export const queries = {
  testAccQ: async (_: any) => {
    const accounts = await Accounts.find({});
    return accounts.length;
  },

  getAccQ: async (_: any, { accountDto }: { accountDto: InputAccountsQ }): Promise<IResponseGet<IAccount>> => {
    const pagination = accountDto?.pagination;
    const filter = accountDto?.filter;

    const { page = 1, limit = 10 } = pagination || {};
    const { name = '' } = filter || {};

    Validator
      .number()
      .positive()
      .notZero()
      .validate({ page })

    Validator
      .number()
      .positive()
      .notZero()
      .validate({ limit })

    Validator.string().minLength(3).validate({ name })

    const accounts = await AccountController.findAll({
      page,
      limit,
      name
    })

    return accounts;
  },

  getByIdAccQ: async (_: any, { id }: { id: string }): Promise<IAccount> => {
    Validator.isId().notEmpty().validate({ id })
    const account = await AccountController.findById(id);
    return account;
  }
};
