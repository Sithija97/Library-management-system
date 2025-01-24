import mongoose from "mongoose";
import { IBook } from "../interfaces/Book";
import Book, { IBookModel } from "../models/Book";
import { IPagination } from "../models/Pagination";
import CustomError from "../utils/error.util";

export async function registerBook(book: IBook): Promise<IBookModel> {
  try {
    const bookExists = await Book.findOne({ barcode: book.barcode });
    if (bookExists) {
      throw new CustomError("Book already exists with this barcode", 409);
    }
    const newBook = new Book(book);
    return await newBook.save();
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error.message);
  }
}

export async function findBookById(id: string): Promise<IBookModel> {
  try {
    const book = await Book.findById(id);
    if (!book) throw new CustomError("The specified book does not exist.", 404);
    return book;
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
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
    const updatedBook = await Book.findOneAndUpdate(
      { barcode: book.barcode },
      book,
      { new: true }
    );
    if (!updatedBook) throw new CustomError("Book does not exist", 404);

    return updatedBook;
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error.message);
  }
}

export async function removeBook(barcode: string): Promise<string> {
  try {
    const id = await Book.findByIdAndDelete(barcode);
    if (!id) throw new CustomError("Book does not exist", 404);

    return "Book deleted successfully";
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error("Unable to delete book.");
  }
}

export async function queryBook(
  page: number,
  limit: number,
  title?: string,
  barcode?: string,
  description?: string,
  author?: string,
  subject?: string,
  genre?: string
): Promise<IPagination<IBookModel>> {
  let books: IBookModel[] = await Book.find();
  let filteredBooks: IBookModel[] = [];

  books.forEach((book) => {
    if (barcode) {
      if (
        book.barcode.toLowerCase().includes(barcode.toLowerCase()) &&
        !filteredBooks.some((b) => b["barcode"] === book.barcode)
      )
        filteredBooks.push(book);
    }
    if (title) {
      if (
        book.title.toLowerCase().includes(title.toLowerCase()) &&
        !filteredBooks.some((b) => b["barcode"] === book.barcode)
      )
        filteredBooks.push(book);
    }
    if (description) {
      if (
        book.description.toLowerCase().includes(description.toLowerCase()) &&
        !filteredBooks.some((b) => b["barcode"] === book.barcode)
      )
        filteredBooks.push(book);
    }
    if (author) {
      if (
        book.authors.some(
          (a) =>
            a.toLowerCase().includes(author.toLowerCase()) &&
            !filteredBooks.some((b) => b["barcode"] === book.barcode)
        )
      )
        filteredBooks.push(book);
    }
    if (subject) {
      if (
        book.subjects.some(
          (s) =>
            s.toLowerCase().includes(subject.toLowerCase()) &&
            !filteredBooks.some((b) => b["barcode"] === book.barcode)
        )
      )
        filteredBooks.push(book);
    }
    if (genre) {
      if (
        book.genre.toLowerCase().includes(genre.toLowerCase()) &&
        !filteredBooks.some((b) => b["barcode"] === book.barcode)
      )
        filteredBooks.push(book);
    }
  });
  return paginateBooks(filteredBooks, page, limit);
}

export function paginateBooks(
  books: IBookModel[],
  page: number,
  limit: number
): IPagination<IBookModel> {
  let pageBooks: IBookModel[] = [];
  const pages = Math.ceil(books.length / Number(limit));

  if (Number(page) === pages) {
    const startPoint = (Number(page) - 1) * Number(limit);
    pageBooks = books.slice(startPoint);
  } else {
    const startPoint = (Number(page) - 1) * Number(limit);
    const endPoint = startPoint + Number(limit);
    pageBooks = books.slice(startPoint, endPoint);
  }

  const pageObject = {
    totalCount: books.length,
    currentPage: Number(page),
    totalPages: pages,
    limit: Number(limit),
    pageCount: pageBooks.length,
    items: pageBooks,
  };

  return pageObject;
}
