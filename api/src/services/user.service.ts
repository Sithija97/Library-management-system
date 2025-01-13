import bcrypt from "bcrypt";
import User, { IUserModel } from "../models/User";
import { IUser } from "../interfaces/User";
import { config } from "../config";

export async function register(user: IUser): Promise<IUserModel> {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  try {
    const ROUNDS = config.server.rounds;
    const hashedPassword = await bcrypt.hash(user.password, ROUNDS);
    const newUser = new User({ ...user, password: hashedPassword });

    return await newUser.save();
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Unable to register user at this time");
  }
}
