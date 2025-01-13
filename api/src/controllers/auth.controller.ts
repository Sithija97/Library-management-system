import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { register } from "../services/user.service";
import { IUser } from "../interfaces/User";

const handleRegister = asyncHandler(async (req: Request, res: Response) => {
  const user: IUser = req.body;
  const registeredUser = await register(user);

  res.status(201).json({
    message: "User successfully created",
    user: {
      _id: registeredUser._id,
      type: registeredUser.type,
      firstName: registeredUser.firstName,
      lastName: registeredUser.lastName,
      email: registeredUser.email,
    },
  });
});

export default { handleRegister };
