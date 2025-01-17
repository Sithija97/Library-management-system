import { Outlet } from "react-router-dom";
import { AuthenticationModal } from "../../features/authentication";
import { RootState, useAppSelector } from "../../store";
import { Footer, Navbar } from "../../features/navigation";
import "./index.css";

export const LayoutPage = () => {
  const { displayLogin } = useAppSelector((state: RootState) => state.modal);
  return (
    <div className="layout-page">
      {displayLogin && <AuthenticationModal />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
