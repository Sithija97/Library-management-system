import { Request, Response } from "express";
import { IUser } from "../models/User";
import { register } from "../services/UserService";

async function handleRegister(req: Request, res: Response) {
  const user: IUser = req.body;

  try {
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
  } catch (error: any) {
    res.status(500).json({
      message: "Unable to register user at this time",
      eroor: error.message,
    });
  }
}

export default { handleRegister };
