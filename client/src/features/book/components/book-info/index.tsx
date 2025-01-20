import { Book } from "../../../../models";
import { mapAuthorsToString } from "../../utils";
import "./index.css";

type IProps = {
  book: Book;
};

export const BookInformation = ({ book }: IProps) => {
  return (
    <div className="book-info">
      <div className="book-info-container">
        <img src={book.cover} className="book-info-cover" alt="book-cover" />
        <div>
          <h2>{book.title}</h2>
          <h3>{`by ${mapAuthorsToString(book)}`}</h3>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
};
