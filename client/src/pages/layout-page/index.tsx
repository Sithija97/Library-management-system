import { Outlet } from "react-router-dom";
import {
  AuthenticationModal,
  LibraryCardModal,
} from "../../features/authentication";
import { RootState, useAppSelector } from "../../store";
import { Footer, Navbar } from "../../features/navigation";
import { LoanBookModal } from "../../features/book";
import "./index.css";

export const LayoutPage = () => {
  const { displayLogin, displayLibraryCard, displayLoan } = useAppSelector(
    (state: RootState) => state.modal
  );
  return (
    <div className="layout-page">
      {displayLogin && <AuthenticationModal />}
      {displayLibraryCard && <LibraryCardModal />}
      {displayLoan && <LoanBookModal />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
