import axios from "axios";
import { LoginUserPayload } from "../models/user";

const login = async (user: LoginUserPayload) => {
  const response = await axios.post("http://localhost:8000/auth/login", user);
  return response.data.user;
};

const UserService = { login };
export default UserService;
