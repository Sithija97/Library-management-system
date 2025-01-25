import { LoanTypes } from "../../../enums";
import { Book } from "../../../models";
import { BookCheckin } from "../components/book-checkin";
import { BookCheckout } from "../components/book-checkout";

export const mapAuthorsToString = (book: Book) => {
  let authors = "";

  for (const author of book.authors) {
    authors += author;
    authors += ", ";
  }

  return authors.slice(0, authors.length - 2);
};

export function determineLoanModakContent(book: Book): JSX.Element {
  if (
    book.records.length === 0 ||
    book.records[0].status === LoanTypes.AVAILABLE
  ) {
    return <BookCheckout />;
  }

  return <BookCheckin />;
}
