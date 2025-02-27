import axios from "axios";
import {
  FetchUserPayload,
  LoginUserPayload,
  RegisterUserPayload,
  User,
} from "../models/user";
import { UserRoles } from "../enums";

const login = async (user: LoginUserPayload) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/login`,
    user
  );
  return response.data.user;
};

const register = async (user: RegisterUserPayload) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/register`,
    user
  );
  return response.data.user;
};

const fetch = async (payload: FetchUserPayload) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/users/${payload.userId}`
  );
  return response.data.user;
};

const update = async (payload: User) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/users`,
    payload
  );
  return response.data.user;
};

const getCard = async (user: string) => {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/card`, {
    user,
  });
  return response.data.libraryCard;
};

const fetchUserRecords = async (userId: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/loan/query`,
    {
      property: UserRoles.PATRON.toLowerCase(),
      value: userId,
    }
  );
  return response.data.records;
};

const UserService = {
  login,
  register,
  fetch,
  update,
  getCard,
  fetchUserRecords,
};
export default UserService;
