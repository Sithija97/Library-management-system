import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  findAllUsers,
  findUserById,
  modifyUser,
  removeUser,
} from "../services/user.service";

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await findAllUsers();

  res.status(200).json({ message: "Users retreived successfully.", users });
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await findUserById(userId);

  res.status(200).json({ message: "User found successfully.", user });
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.body;
  const updatedUser = await modifyUser(user);

  res.status(202).json({ message: "User updated successfully.", updatedUser });
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  await removeUser(userId);

  res.status(202).json({ message: "User deleted successfully." });
});

export default { getAllUsers, getUserById, updateUser, deleteUser };
