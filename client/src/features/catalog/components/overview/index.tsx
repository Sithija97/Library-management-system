import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { fetchAllBooks } from "../../../../store/slices/book.slice";
import { LoadingStates } from "../../../../enums";
import { generateRandomGenres, getBookListByGenre } from "../../utils";
import { CatalogOverviewSection } from "../overview-section";
import "./index.css";

export const CatalogOverview = () => {
  const dispatch = useAppDispatch();
  const bookState = useAppSelector((state: RootState) => state.books);

  const [genres, setGenres] = useState<string[]>(() => {
    return generateRandomGenres();
  });

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, []);

  return (
    <>
      {bookState.books.length > 0 &&
      bookState.fetchAllBooksStatus !== LoadingStates.LOADING ? (
        <div className="catalog-overview">
          <h2>
            Welcome to our library, we currently have{" "}
            {bookState.books && bookState.books.length} books.
          </h2>
          <h4>
            Browse our selected books below, or search for something using the
            top navigation bar.
          </h4>
          {genres.map((genre) => {
            return (
              <CatalogOverviewSection
                key={genre}
                books={getBookListByGenre(genre, bookState.books)}
                label={genre}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
