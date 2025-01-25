import { UserRoles } from "../../../../enums";
import { RootState, useAppSelector } from "../../../../store";
import { BookAdditionalInfo } from "../book-aditional-info";
import { BookHistory } from "../book-history";
import { BookInformation } from "../book-info";
import { BookSubjects } from "../book-subjects";
import "./index.css";

export const BookOverview = () => {
  const { loggedInUser } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const { currentBook, loadBookByBarcodeSuccess } = useAppSelector(
    (state: RootState) => state.books
  );

  return (
    <div className="book-verview">
      {currentBook && loadBookByBarcodeSuccess && (
        <>
          <BookInformation book={currentBook} />
          <BookSubjects subjects={currentBook.subjects} />
          <BookAdditionalInfo book={currentBook} />
          {loggedInUser?.type === UserRoles.EMPLOYEE && (
            <BookHistory book={currentBook} />
          )}
        </>
      )}
    </div>
  );
};
