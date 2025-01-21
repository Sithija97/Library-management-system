import { Book } from "../../../models";

export function generateRandomGenres(): string[] {
  const choices = [
    "Non-Fiction",
    "Childrens",
    "Fantasy",
    "Fiction",
    "Biography",
    "Romance",
    "Science Fiction",
    "Young Adult",
  ];
  const chosen: string[] = [];

  while (chosen.length !== 5) {
    const num = Math.floor(Math.random() * 7);
    if (!chosen.includes(choices[num])) chosen.push(choices[num]);
  }

  return chosen;
}

export function getBookListByGenre(genre: string, books: Book[]): Book[] {
  const filteredBooks = books.filter((book) => book.genre === genre);
  const bookList: Book[] = [];

  if (filteredBooks.length < 10) return filteredBooks;

  while (bookList.length !== 10) {
    const index = Math.floor(Math.random() * filteredBooks.length);
    if (!bookList.some((b) => b["barcode"] === filteredBooks[index].barcode))
      bookList.push(filteredBooks[index]);
  }

  return bookList;
}
