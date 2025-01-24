import { Schema } from "mongoose";

export interface ILoanRecord {
  status: "AVAILABLE" | "LOANED";
  loanedDate: Date;
  dueDate: Date;
  returnedDate?: Date;
  patron: Schema.Types.ObjectId;
  employeeOut: Schema.Types.ObjectId;
  employeeIn?: Schema.Types.ObjectId;
  item: Schema.Types.ObjectId;
}
