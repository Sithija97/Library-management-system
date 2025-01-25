import { Book } from "./book";

export type LoanRecord = {
  _id: string;
  status: "AVAILABLE" | "LOANED";
  loanedDate: Date;
  dueDate: Date;
  returnedDate?: Date;
  patron: string;
  employeeOut: string;
  employeeIn?: string;
  item: Book;
  createdAt: Date;
  updatedAt: Date;
};
