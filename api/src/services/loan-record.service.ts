import { ILoanRecord } from "../interfaces/LoanRecord";
import LoanRecord, { ILoanRecordModel } from "../models/LoanRecord";
import CustomError from "../utils/error.util";
import { findBookById, modifyBook } from "./book.service";

export async function generateRecord(
  record: ILoanRecord
): Promise<ILoanRecordModel> {
  try {
    let createdRecord = new LoanRecord(record);
    createdRecord = await createdRecord.save();

    let book = await findBookById(String(record.item));
    let records = book.records;

    records = [createdRecord, ...records];
    book.records = records;

    await modifyBook(book);
    return createdRecord;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function findAllRecords(): Promise<ILoanRecordModel[]> {
  try {
    const records = LoanRecord.find();
    return records;
  } catch (error) {
    return [];
  }
}

export async function modifyRecord(
  record: ILoanRecordModel
): Promise<ILoanRecordModel> {
  try {
    const updatedRecord = await LoanRecord.findByIdAndUpdate(
      {
        _id: record._id,
      },
      record,
      { new: true }
    );

    if (updatedRecord) {
      let book = await findBookById(String(record.item));
      let records = book.records;

      records[0] = updatedRecord;
      book.records = records;

      await modifyBook(book);
      return updatedRecord;
    }

    throw new CustomError("Record does not exist", 404);
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error.message);
  }
}

export async function queryRecords() {}
