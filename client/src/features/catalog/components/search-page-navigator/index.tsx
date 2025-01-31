import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppSelector } from "../../../../store";
import { calculatePaging } from "../../utils";
import "./index.css";

export const CatalogSearchPageNavigator = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const { pagingInformation } = useAppSelector(
    (state: RootState) => state.books
  );

  const navigateToPrevious = () => {
    if (pagingInformation && pagingInformation.currentPage !== 1)
      if (search.includes("&page=")) {
        const splitString = search.split("&page=");
        const newTerms =
          splitString[0] + `&page=${pagingInformation.currentPage - 1}`;
        navigate(`/catalog${newTerms}`);
      } else {
        const newTerms = search + `&page=${pagingInformation.currentPage - 1}`;
        navigate(`/catalog${newTerms}`);
      }
  };

  const navigateToNumber = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if (search.includes("&page=")) {
      const splitString = search.split("&page=");
      const newTerms = splitString[0] + `&page=${e.currentTarget.id}`;
      navigate(`/catalog${newTerms}`);
    } else {
      const newTerms = search + `&page=${e.currentTarget.id}`;
      navigate(`/catalog${newTerms}`);
    }
  };

  const navigateToNext = () => {
    if (
      pagingInformation &&
      pagingInformation.currentPage !== pagingInformation.totalPages
    )
      if (search.includes("&page=")) {
        const splitString = search.split("&page=");
        const newTerms =
          splitString[0] + `&page=${pagingInformation.currentPage + 1}`;
        navigate(`/catalog${newTerms}`);
      } else {
        const newTerms = search + `&page=${pagingInformation.currentPage + 1}`;
        navigate(`/catalog${newTerms}`);
      }
  };

  return (
    <div className="catalog-search-page-navigator">
      <p
        className="catalog-search-page-navigator-navigate"
        onClick={navigateToPrevious}
      >
        Prev
      </p>
      <div className="catalog-search-page-numbers">
        {pagingInformation &&
          calculatePaging(pagingInformation).map((num) => {
            if (num === `${pagingInformation.currentPage}`)
              return (
                <p
                  key={num}
                  className="catalog-search-page-number number-active"
                >
                  {num}
                </p>
              );

            return (
              <p
                key={num}
                id={num}
                className="catalog-search-page-number"
                onClick={navigateToNumber}
              >
                {num}
              </p>
            );
          })}
      </div>
      <p
        className="catalog-search-page-navigator-navigate"
        onClick={navigateToNext}
      >
        Next
      </p>
    </div>
  );
};
