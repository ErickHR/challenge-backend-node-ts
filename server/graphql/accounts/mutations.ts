import { AccountController } from "../../controllers/account";
import { IAccount } from "../../interfaces/account";
import { Validator } from "../../utils/validation";

interface CreateAccMDto {
  name: string;
  email: string;
}

export const mutations = {
  testAccM: async (_: any) => {
    return true;
  },

  createAccM: async (_: any, { account }: { account: CreateAccMDto }): Promise<IAccount> => {
    const { name, email } = account
    Validator
      .string()
      .notEmpty()
      .minLength(3)
      .validate({ name })

    Validator
      .string()
      .notEmpty()
      .isEmail()
      .validate({ email })

    const result = await AccountController.create({ name, email });
    return result
  }
};
