import { useNavigate } from "react-router-dom";
import { Book } from "../../../../models";
import { RootState, useAppSelector } from "../../../../store";
import { LoadingStates } from "../../../../enums";
import { BookCarousel } from "../../../book";
import "./index.css";

type IProps = {
  books: Book[];
  label: string;
};

export const CatalogOverviewSection = ({ books, label }: IProps) => {
  const navigate = useNavigate();
  const bookState = useAppSelector((state: RootState) => state.books);

  const handleViewMore = () =>
    navigate(`catalog?genre=${label}&subject=${label}`);

  return (
    <div className="catalog-overview-section">
      <div className="catalog-overview-section-top">
        <h4>{label}</h4>
        <p className="catalog-overview-section-more" onClick={handleViewMore}>
          View more...
        </p>
      </div>
      {books.length > 0 &&
        bookState.fetchAllBooksStatus === LoadingStates.SUCCESS && (
          <BookCarousel books={books} />
        )}
    </div>
  );
};
