import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { getLibraryCard } from "../../../../store/slices/auth.slice";
import {
  setDisplayLibraryCard,
  setDisplayLogin,
} from "../../../../store/slices/modal.slice";
import "./index.css";

export const RegisterLibraryCardForm = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state: RootState) => state.authentication);

  const handleCreateLibraryCard = () => {
    if (userState.loggedInUser)
      dispatch(getLibraryCard(userState.loggedInUser._id));
  };

  const handleLogin = () => {
    dispatch(setDisplayLibraryCard(false));
    dispatch(setDisplayLogin(true));
  };

  return (
    <>
      {userState.loggedInUser ? (
        <div className="register-library-card-container">
          <h3 className="register-library-card-text">{`Welcome ${userState.loggedInUser.firstName} ${userState.loggedInUser.lastName}!`}</h3>
          <h5 className="register-library-card-text">
            To signup for a new library card, or you forgot the ID number on
            your card, use the button below.
          </h5>
          {userState.libraryCard ? (
            <p className="register-library-card-text">{`Your library card number : ${userState.libraryCard}`}</p>
          ) : (
            <button
              className="register-library-modal-button"
              onClick={handleCreateLibraryCard}
            >
              get Library Card
            </button>
          )}
        </div>
      ) : (
        <div className="register-library-card-container">
          <h3 className="register-library-card-text">
            You must be a member of the library to obtain a library card.
          </h3>
          <h5 className="register-library-card-text">
            Use the button below to login to your account or register for free.
          </h5>
          <button
            className="register-library-modal-button"
            onClick={handleLogin}
          >
            Login here
          </button>
        </div>
      )}
    </>
  );
};
