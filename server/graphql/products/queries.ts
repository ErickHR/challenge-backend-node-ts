import { ProductController } from "../../controllers/product";
import { PaginationDto } from "../../interfaces/pagination-request";
import { IResponseGet } from "../../interfaces/pagination-response";
import { IProduct } from "../../interfaces/product";
import Products from "../../models/products";
import { Validator } from "../../utils/validation";


interface FilterDto {
  accountId?: string
}

interface InputProductsQ {
  pagination: PaginationDto
  filter: FilterDto
}


export const queries = {
  testProdQ: async (_: any) => {
    const products = await Products.find({});
    return products.length;
  },

  getByIdAccountProdQ: async (_: any, { productDto }: { productDto: InputProductsQ }): Promise<IResponseGet<IProduct>> => {
    const pagination = productDto?.pagination;
    const filter = productDto?.filter;

    const { page = 1, limit = 10 } = pagination || {};
    const { accountId = '' } = filter || {};

    Validator
      .number()
      .positive()
      .optional()
      .notZero()
      .validate({ page })

    Validator
      .number()
      .optional()
      .positive()
      .notZero()
      .validate({ limit })

    Validator.isId().validate({ accountId })

    const products = await ProductController.findByAccountId({
      page,
      limit,
      accountId
    })

    return products;
  },
  getByIdProdQ: async (_: any, { id }: { id: string }): Promise<IProduct> => {

    Validator.isId().validate({ id })

    const product = await ProductController.findById(id);
    return product;
  },
};
