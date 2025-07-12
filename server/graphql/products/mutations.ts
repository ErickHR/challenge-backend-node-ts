import { AccountController } from "../../controllers/account";
import { ProductController } from "../../controllers/product";
import { IProduct } from "../../interfaces/product";
import { Validator } from "../../utils/validation";

interface CreateProdMDto {
  name: string;
  sku: string;
  stock: number;
}

interface PurchaseOrderMDto {
  productId: string;
  quantity: number;
  accountId: string;
}

export const mutations = {
  testProdM: async (_: any) => {
    return true;
  },
  createProdM: async (_: any, { product, accountId }: { product: CreateProdMDto, accountId: string }): Promise<IProduct> => {
    const { name, sku, stock } = product

    Validator
      .string()
      .notEmpty()
      .minLength(3)
      .validate({ name })
    Validator
      .string()
      .notEmpty()
      .minLength(3)
      .validate({ sku })

    Validator
      .number()
      .positive()
      .notZero()
      .validate({ stock })

    Validator.isId().validate({ accountId })

    const result = await ProductController.create({ name, sku, stock, accountId });
    return result
  },
  purchaseProductM: async (_: any, { purchaseOrderDto }: { purchaseOrderDto: PurchaseOrderMDto }): Promise<string> => {

    const { productId, quantity, accountId } = purchaseOrderDto;

    Validator.isId().validate({ productId })
    Validator.isId().validate({ accountId })
    Validator
      .number()
      .positive()
      .notZero()
      .validate({ quantity })

    try {
      const acount = await AccountController.existsAccount(accountId);
      const product = await ProductController.productExists(productId, accountId);
      await ProductController.purchaseProduct(product);

      return `Purchase order processed successfully for product ${product.name}.`;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Error processing purchase order";
    }

  }
};
