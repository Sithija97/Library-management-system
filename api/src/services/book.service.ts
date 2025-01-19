import { IBook } from "../interfaces/Book";
import Book, { IBookModel } from "../models/Book";
import CustomError from "../utils/error.util";

export async function registerBook(book: IBook): Promise<IBookModel> {
  const bookExists = await Book.findOne({ barcode: book.barcode });
  if (bookExists) {
    throw new CustomError("Book already exists with this barcode", 409);
  }
  try {
    const newBook = new Book(book);
    return await newBook.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function findAllBooks(): Promise<IBookModel[]> {
  try {
    const books = await Book.find();
    return books;
  } catch (error) {
    return [];
  }
}

export async function modifyBook(book: IBookModel): Promise<IBookModel> {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      { barcode: book.barcode },
      book,
      { new: true }
    );
    if (!updatedBook) throw new CustomError("Book does not exist", 404);

    return updatedBook;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function removeBook(barcode: string): Promise<string> {
  try {
    const id = await Book.findByIdAndDelete(barcode);
    if (!id) throw new CustomError("Book does not exist", 404);

    return "Book deleted successfully";
  } catch (error) {
    throw new Error("Unable to delete book.");
  }
}
