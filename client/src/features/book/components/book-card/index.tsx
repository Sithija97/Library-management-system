import { useNavigate } from "react-router-dom";
import { Book } from "../../../../models";
import { mapAuthorsToString } from "../../utils";
import "./index.css";

type IProps = {
  book: Book;
};

export const BookCard = ({ book }: IProps) => {
  const navigate = useNavigate();

  const displayBook = () => navigate(`/resource/${book.barcode}`);

  return (
    <div id="book-card" className="book-card" onClick={displayBook}>
      <img src={book.cover} alt="book-cover" className="book-card-cover" />
      <div className="book-card-info">
        <h1 className="book-card-title">{book.title}</h1>
        <h3 className="book-card-author">{mapAuthorsToString(book)}</h3>
        <p className="book-card-description">{book.description}</p>
      </div>
    </div>
  );
};
