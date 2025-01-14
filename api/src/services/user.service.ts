import bcrypt from "bcrypt";
import User, { IUserModel } from "../models/User";
import { IUser } from "../interfaces/User";
import { config } from "../config";
import CustomError from "../utils/error.util";

export async function register(user: IUser): Promise<IUserModel> {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new CustomError("User already exists with this email", 409);
  }

  try {
    const ROUNDS = config.server.rounds;
    const hashedPassword = await bcrypt.hash(user.password, ROUNDS);
    const newUser = new User({ ...user, password: hashedPassword });

    return await newUser.save();
  } catch (error) {
    if (error instanceof CustomError) throw error;
    console.error("Unable to register user at this time:", error);
    throw new Error("Unable to register user at this time.");
  }
}

export async function login(credentials: {
  email: string;
  password: string;
}): Promise<IUserModel> {
  const { email, password } = credentials;
  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new CustomError("Invalid username or password", 401);
    }

    return user;
  } catch (error) {
    if (error instanceof CustomError) throw error;
    console.error("Unexpected error during registration:", error);
    throw new Error("Unexpected error during registration.");
  }
}
