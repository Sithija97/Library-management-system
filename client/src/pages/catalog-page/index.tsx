import { useLocation } from "react-router-dom";
import { CatalogOverview, CatalogSearch } from "../../features/catalog";

export const CatalogPage = () => {
  const location = useLocation();
  return (
    <div className="page">
      <div className="page-container">
        {location.search === "" ? <CatalogOverview /> : <CatalogSearch />}
      </div>
    </div>
  );
};
