import { Book, PageInfo } from "../../../models";

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

export function calculatePaging(pageInfo: PageInfo): string[] {
  const pArr: string[] = [];

  if (pageInfo) {
    const total = pageInfo.totalPages;
    const current = pageInfo.currentPage;

    if (total <= 10) {
      for (let i = 1; i <= total; i++) {
        pArr.push(`${i}`);
      }
    } else if (total > 10 && current - 7 <= 0) {
      for (let i = 1; i <= 8; i++) {
        pArr.push(`${i}`);
      }

      pArr.push("...");
      for (let i = total - 1; i <= total; i++) {
        pArr.push(`${i}`);
      }
    } else if (total > 10 && total - 7 > 0 && total - current > 5) {
      for (let i = 1; i <= 2; i++) {
        pArr.push(`${i}`);
      }

      pArr.push("...");

      for (let i = current; i <= current + 4; i++) {
        pArr.push(`${i}`);
      }

      pArr.push("...");

      for (let i = total - 1; i <= total; i++) {
        pArr.push(`${i}`);
      }
    } else {
      for (let i = 1; i <= 2; i++) {
        pArr.push(`${i}`);
      }
      pArr.push("...");

      for (let i = total - 5; i <= total; i++) {
        pArr.push(`${i}`);
      }
    }
  }
  return pArr;
}
