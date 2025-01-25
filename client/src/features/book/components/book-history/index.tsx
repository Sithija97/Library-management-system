import { Book } from "../../../../models";
import { BookHistoryItem } from "../book-history-item";
import "./index.css";

type IProps = {
  book: Book;
};

export const BookHistory = ({ book }: IProps) => {
  return (
    <div className="book-history">
      <h2>Loan History</h2>
      <div className="book-history-box">
        {book.records.map((record) => (
          <BookHistoryItem key={record._id} record={record} />
        ))}
      </div>
    </div>
  );
};
