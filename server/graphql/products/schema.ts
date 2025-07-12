import { gql } from "apollo-server-express";


export const schema = gql`

  type Product {
    _id: ID!
    name: String
    sku: String
    stock: Int
  }
  
  input FilterProdDto {
    accountId: String
  }

  input ProductQDto {
    pagination: PaginationDto
    filter: FilterProdDto
  }

  input CreateProdMDto {
    name: String!
    sku: String!
    stock: Int!
  }

  input PurchaseOrderMDto {
    productId: String!
    quantity: Int!
    accountId: String!
  }

  type MetaResponse {
    totalItems: Int!
    totalPage: Int!
    previousPage: Int
    nextPage: Int
    currentPage: Int!
  }

  type ResponseProd {
    meta: MetaResponse
    data: [Product]!
  }

  extend type Query {
    testProdQ: Int,
    getByIdAccountProdQ(productDto: ProductQDto): ResponseProd!,
    getByIdProdQ(id: String!): Product,
  }

  extend type Mutation {
    testProdM: Boolean,
    createProdM(product: CreateProdMDto!, accountId: String!): Product,
    purchaseProductM(purchaseOrderDto: PurchaseOrderMDto!): String!
  }
`;
