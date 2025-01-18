import axios from "axios";
import {
  FetchUserPayload,
  LoginUserPayload,
  RegisterUserPayload,
} from "../models/user";

const login = async (user: LoginUserPayload) => {
  const response = await axios.post("http://localhost:8000/auth/login", user);
  return response.data.user;
};

const register = async (user: RegisterUserPayload) => {
  const response = await axios.post(
    "http://localhost:8000/auth/register",
    user
  );
  return response.data.user;
};

const fetch = async (payload: FetchUserPayload) => {
  const response = await axios.get(
    `http://localhost:8000/users/${payload.userId}`
  );
  return response.data.user;
};

const UserService = { login, register, fetch };
export default UserService;
