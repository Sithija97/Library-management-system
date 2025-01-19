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
      throw new CustomError("Invalid email or password", 401);
    }

    return user;
  } catch (error) {
    throw new Error("Unexpected error during registration.");
  }
}

export async function findAllUsers(): Promise<IUserModel[]> {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return [];
  }
}

export async function findUserById(userId: string): Promise<IUserModel> {
  try {
    const user = await User.findById(userId);
    if (user) return user;

    throw new CustomError("User does not exist with this ID", 404);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function modifyUser(user: IUserModel): Promise<IUserModel> {
  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    if (!updatedUser) {
      throw new CustomError("Unable to update user", 404);
    }
    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function removeUser(userId: string): Promise<string> {
  try {
    const id = await User.findByIdAndDelete(userId);
    if (!id) throw new CustomError("User does not exist", 404);

    return "User deleted successfully";
  } catch (error) {
    throw new Error("Unable to delete user.");
  }
}
