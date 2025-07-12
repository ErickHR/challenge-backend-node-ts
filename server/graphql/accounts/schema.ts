import { gql } from "apollo-server-express";

export const schema = gql`

  type Account {
    _id: String!
    name: String!
    email: String!
  }

  type ResponseAccount {
    meta: MetaResponse
    data: [Account]!
  }

  input FilterAccDto {
    name: String
  }

  input AccountsQDto {
    pagination: PaginationDto
    filter: FilterAccDto
  }

  input CreateAccMDto {
    name: String!
    email: String!
  }

  extend type Query {
    testAccQ: Int,
    getAccQ(accountDto: AccountsQDto): ResponseAccount
    getByIdAccQ(id: String): Account
  }

  extend type Mutation {
    testAccM: Boolean,
    createAccM(account: CreateAccMDto!): Account
  }
`;
