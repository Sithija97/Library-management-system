import { useLocation } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { useEffect } from "react";
import { queryBooks } from "../../../../store/slices/book.slice";
import { LoadingStates } from "../../../../enums";
import { BookCard } from "../../../book";
import { CatalogAdvancedSearch } from "../advance-search";
import "./index.css";
import { CatalogSearchPageNavigator } from "../search-page-navigator";

export const CatalogSearch = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const bookState = useAppSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(queryBooks(location.search));
  }, [location.search]);

  return (
    <div className="catalog-search">
      <div className="catalog-search-advanced-saerch-section">
        <CatalogAdvancedSearch />
      </div>
      {bookState.queryBooksStatus === LoadingStates.LOADING ? (
        <p>loading...</p>
      ) : (
        <>
          <h2>
            {`Displaying ${bookState.pagingInformation?.pageCount} books out of
          ${bookState.pagingInformation?.totalCount}`}
          </h2>
          <div className="catalog-search-item-area">
            {bookState.books.map((book) => (
              <BookCard key={book.barcode} book={book} />
            ))}
          </div>
          <div className="catalog-search-pages">
            <CatalogSearchPageNavigator />
          </div>
        </>
      )}
    </div>
  );
};
