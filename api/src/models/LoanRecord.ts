import mongoose, { Document, Schema } from "mongoose";
import { ILoanRecord } from "../interfaces/LoanRecord";

export interface ILoanRecordModel extends ILoanRecord, Document {}

export const LoanRecordSchema = new Schema<ILoanRecordModel>({
  status: { type: String, required: true },
  loanedDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  returnedDate: { type: Date, required: false },
  patron: { type: Schema.Types.ObjectId, required: true },
  employeeOut: { type: Schema.Types.ObjectId, required: true },
  employeeIn: { type: Schema.Types.ObjectId, required: false },
  item: { type: Schema.Types.ObjectId, required: true, ref: "Book" },
});

export default mongoose.model<ILoanRecordModel>("LoanRecord", LoanRecordSchema);
