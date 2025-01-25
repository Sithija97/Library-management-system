import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { loadBookByBarcode } from "../../store/slices/book.slice";
import { CATALOG } from "../../router";
import { BookOverview } from "../../features/book";

export const ResourcePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loadBookByBarcodeError } = useAppSelector(
    (state: RootState) => state.books
  );
  const { barcode } = useParams();

  useEffect(() => {
    if (barcode) {
      dispatch(loadBookByBarcode(barcode));
    }
  }, [barcode]);

  useEffect(() => {
    if (loadBookByBarcodeError) {
      navigate(CATALOG);
    }
  }, [loadBookByBarcodeError]);

  return (
    <div className="page">
      <div className="page-container">
        <BookOverview />
      </div>
    </div>
  );
};
