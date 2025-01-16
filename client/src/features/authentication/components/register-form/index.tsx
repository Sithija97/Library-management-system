import { useEffect, useRef } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import {
  registerUser,
  resetRegisterSuccess,
} from "../../../../store/slices/auth.slice";
import { UserRoles } from "../../../../enums";
import "./index.css";

type IProps = {
  toggleLogin(): void;
};

export const RegisterForm = ({ toggleLogin }: IProps) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.authentication);

  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      firstRef &&
      firstRef.current &&
      lastRef &&
      lastRef.current &&
      emailRef &&
      emailRef.current &&
      passwordRef &&
      passwordRef.current
    ) {
      dispatch(
        registerUser({
          type: UserRoles.PATRON,
          firstName: firstRef.current.value,
          lastName: lastRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetRegisterSuccess());
    };
  }, []);

  return (
    <form onSubmit={handleRegisterUser} className="register-form">
      <h2>Enter your Information</h2>
      {auth.loginUserError && (
        <p className="login-form-error">There was an error</p>
      )}
      <div className="register-form-name-group">
        <div className="register-form-name-input-group">
          <h6>First Name</h6>
          <input
            type="text"
            placeholder="firstname"
            name="firstname"
            required
            ref={firstRef}
            className="register-form-input-name"
          />
        </div>
        <div className="register-form-name-input-group">
          <h6>Last Name</h6>
          <input
            type="text"
            placeholder="lastname"
            name="lastname"
            required
            ref={lastRef}
            className="register-form-input-name"
          />
        </div>
      </div>
      <div className="register-form-input-group">
        <h6>Email</h6>
        <input
          type="email"
          placeholder="email"
          name="email"
          required
          ref={emailRef}
          className="register-form-input"
        />
      </div>
      <div className="register-form-input-group">
        <h6>Password</h6>
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          ref={passwordRef}
          className="register-form-input"
        />
      </div>
      <button type="submit" className="register-form-submit">
        Register
      </button>
      {auth.registerUserSuccess ? (
        <p>
          Registered Successfully.{" "}
          <span className="register-form-login" onClick={toggleLogin}>
            Login here.
          </span>
        </p>
      ) : (
        <></>
      )}
    </form>
  );
};
