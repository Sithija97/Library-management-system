import { useNavigate } from "react-router-dom";
import { Book } from "../../../../models";
import { mapAuthorsToString } from "../../utils";
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "../../../../store";
import React, { useEffect, useState } from "react";
import { LoanTypes, UserRoles } from "../../../../enums";
import { setCurrentBook } from "../../../../store/slices/book.slice";
import { setDisplayLoan } from "../../../../store/slices/modal.slice";
import "./index.css";

type IProps = {
  book: Book;
};

export const BookCard = ({ book }: IProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(
    (state: RootState) => state.authentication.loggedInUser
  );

  const [available, setAvailable] = useState<boolean>(() => {
    if (book.records.length === 0) return true;
    return book.records[0].status === LoanTypes.AVAILABLE;
  });
  const [buttonClass, setButtonClass] = useState<string>("");

  const handleLoan = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (user?.type === UserRoles.EMPLOYEE) {
      dispatch(setCurrentBook(book));
      dispatch(setDisplayLoan(true));
    }
  };

  const displayBook = () => navigate(`/resource/${book.barcode}`);

  useEffect(() => {
    if (book.records.length === 0) {
      setAvailable(true);
    } else {
      setAvailable(book.records[0].status === LoanTypes.AVAILABLE);
    }
  }, [book.records]);

  useEffect(() => {
    let classname = "book-card-loan-button";
    if (available) {
      classname += " available";
    } else {
      classname += " unavailable";
    }

    if (user && user.type === UserRoles.EMPLOYEE && available) {
      classname += " checkout";
    } else if (user && user.type === UserRoles.EMPLOYEE && !available) {
      classname += " checkin";
    }

    setButtonClass(classname);
    console.log(classname);
    console.log(available);
    console.log(book.records);
  }, [available, user?.type, book.records]);

  return (
    <div id="book-card" className="book-card" onClick={displayBook}>
      <img src={book.cover} alt="book-cover" className="book-card-cover" />
      <div className="book-card-info">
        <h1 className="book-card-title">{book.title}</h1>
        <h3 className="book-card-author">{mapAuthorsToString(book)}</h3>
        <p className="book-card-description">{book.description}</p>
      </div>
      <button className={buttonClass} onClick={handleLoan}>
        Status: {available ? "AVAILABLE" : "UNAVAILABLE"}
      </button>
    </div>
  );
};
