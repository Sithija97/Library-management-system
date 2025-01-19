import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  findAllBooks,
  modifyBook,
  registerBook,
  removeBook,
} from "../services/book.service";

const createBook = asyncHandler(async (req: Request, res: Response) => {
  const book = req.body;
  const savedBook = await registerBook(book);

  res.status(201).json({ message: "Book created successfully.", savedBook });
});

const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await findAllBooks();

  res.status(200).json({ message: "Books retreived successfully.", books });
});

const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const book = req.body;
  const updatedBook = await modifyBook(book);

  res.status(202).json({ message: "Book updated successfully.", updatedBook });
});

const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const barcode: string = req.params.barcode;
  await removeBook(barcode);

  res.status(202).json({ message: "Book deleted successfully." });
});

export default { createBook, getAllBooks, updateBook, deleteBook };
