import { IAccount } from "./account";

export interface IResponseGet<T> {
  meta: {
    totalItems: number;
    totalPage: number;
    previousPage: number | null;
    nextPage: number | null;
    currentPage: number;
  };
  data: T[];
}
