import { useRef } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { loginUser } from "../../../../store/slices/auth.slice";
import "./index.css";

type IProps = {
  toggleRegister(): void;
};

export const LoginForm = ({ toggleRegister }: IProps) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.authentication);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef && emailRef.current && passwordRef && passwordRef.current)
      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
  };

  return (
    <form onSubmit={handleLoginUser} className="login-form">
      <h2>Please Login</h2>
      {auth.loginUserError && (
        <p className="login-form-error">username or password incorrect</p>
      )}
      <div className="login-form-input-group">
        <h6>Email</h6>
        <input
          type="email"
          placeholder="email"
          name="email"
          required
          ref={emailRef}
          className="login-form-input"
        />
      </div>
      <div className="login-form-input-group">
        <h6>Password</h6>
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          ref={passwordRef}
          className="login-form-input"
        />
      </div>
      <button type="submit" className="login-form-submit">
        Login
      </button>
      <p>
        Don't have an account?
        <span className="login-form-register" onClick={toggleRegister}>
          Create one here
        </span>
      </p>
    </form>
  );
};
