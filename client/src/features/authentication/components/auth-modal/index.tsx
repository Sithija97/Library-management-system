import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { setDisplayLogin } from "../../../../store/slices/modal.slice";
import { Modal } from "../../../../components";
import { LoginForm } from "../login-form";
import { RegisterForm } from "../register-form";

export const AuthenticationModal = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state: RootState) => state.authentication);

  const [login, setLogin] = useState<boolean>(true);

  const closeModal = () => dispatch(setDisplayLogin(false));
  const toggleLogin = () => setLogin(!login);

  useEffect(() => {
    if (authState.loggedInUser) closeModal();

    return () => {
      if (authState.loggedInUser)
        localStorage.setItem("userId", authState.loggedInUser._id);
    };
  }, [authState.loggedInUser]);

  return (
    <Modal
      content={
        login ? (
          <LoginForm toggleRegister={toggleLogin} />
        ) : (
          <RegisterForm toggleLogin={toggleLogin} />
        )
      }
      toggleModal={toggleLogin}
    />
  );
};
