import { LoanRecord } from "./loan-record";
import { User } from "./user";

export type Book = {
  _id: string;
  barcode: string;
  cover: string;
  title: string;
  authors: string[];
  description: string;
  subjects: string[];
  publicationDate: Date;
  publisher: string;
  pages: number;
  genre: string;
  records: LoanRecord[];
};

export type CheckoutBookPayload = {
  book: Book;
  libraryCard: string;
  employee: User;
};

export type CheckinBookPayload = {
  book: Book;
  employee: User;
};
