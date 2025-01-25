import React from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import {
  checkinBook,
  setCurrentBook,
} from "../../../../store/slices/book.slice";
import { setDisplayLoan } from "../../../../store/slices/modal.slice";
import "./index.css";

export const BookCheckin = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(
    (state: RootState) => state.authentication.loggedInUser
  );
  const book = useAppSelector((state: RootState) => state.books.currentBook);

  const checkin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (book && user) {
      dispatch(
        checkinBook({
          book,
          employee: user,
        })
      );

      dispatch(setDisplayLoan(false));
      dispatch(setCurrentBook(undefined));
    }
  };

  return (
    <div className="book-checkin">
      {book && user && (
        <form className="book-checkin-form">
          <h3>Check In Book Titled: {book.title}</h3>
          <h4>Check In Employee ID: </h4>
          <input className="book-checkin-input" value={user._id} disabled />
          <button className="book-checkin-button" onClick={checkin}>
            Check In Book
          </button>
        </form>
      )}
    </div>
  );
};
