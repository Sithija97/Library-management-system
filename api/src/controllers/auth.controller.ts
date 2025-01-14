import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { login, register } from "../services/user.service";
import { IUser } from "../interfaces/User";

const handleRegister = asyncHandler(async (req: Request, res: Response) => {
  const user: IUser = req.body;
  const registeredUser = await register(user);

  const { password, ...userWithoutPassword } = registeredUser.toObject();
  res.status(201).json({
    message: "User successfully created.",
    user: userWithoutPassword,
  });
});

const handleLogin = asyncHandler(async (req: Request, res: Response) => {
  const credentials = req.body;
  const loggedInUser = await login(credentials);

  const { password, ...userWithoutPassword } = loggedInUser.toObject();
  res.status(200).json({
    message: "User logged in successfully.",
    user: userWithoutPassword,
  });
});

export default { handleRegister, handleLogin };
