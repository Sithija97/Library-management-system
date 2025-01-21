import { useLocation } from "react-router-dom";
import { CatalogOverview } from "../../features/catalog";

export const CatalogPage = () => {
  const location = useLocation();
  return (
    <div className="page">
      <div className="page-container">
        {location.search === "" ? <CatalogOverview /> : <>Catalog Search</>}
      </div>
    </div>
  );
};
