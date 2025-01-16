import { AuthenticationModal } from "../../features/authentication";
import { RootState, useAppSelector } from "../../store";

export const HomePage = () => {
  const displayLogin = useAppSelector(
    (state: RootState) => state.modal.displayLogin
  );
  return (
    <div className="page">
      Home Page
      {displayLogin ? <AuthenticationModal /> : <></>}
    </div>
  );
};
