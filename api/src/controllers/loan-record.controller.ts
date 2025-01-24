import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  findAllRecords,
  generateRecord,
  modifyRecord,
  queryRecords,
} from "../services/loan-record.service";

const createRecord = asyncHandler(async (req: Request, res: Response) => {
  const record = req.body;
  const createdRecord = await generateRecord(record);

  res.status(201).json({ message: "New record generated.", createdRecord });
});

const updateRecord = asyncHandler(async (req: Request, res: Response) => {
  const record = req.body;
  const updatedRecord = await modifyRecord(record);

  res
    .status(200)
    .json({ message: "Record updated successfully.", updatedRecord });
});

const getAllRecords = asyncHandler(async (req: Request, res: Response) => {
  const records = await findAllRecords();

  res.status(200).json({ message: "Retreived all records", records });
});

const getRecordsByProperty = asyncHandler(
  async (req: Request, res: Response) => {
    const params = req.body;
    const records = await queryRecords(params);

    res
      .status(200)
      .json({ message: "Retreived records from your query", records });
  }
);

export default {
  createRecord,
  updateRecord,
  getAllRecords,
  getRecordsByProperty,
};
