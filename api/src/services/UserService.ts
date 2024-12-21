import bcrypt from "bcrypt";
import { IUser } from "../models/User";
import UserDao, { IUserModel } from "../daos/UserDao";
import { config } from "../config";

export async function register(user: IUser): Promise<IUserModel> {
  const ROUNDS = config.server.rounds;

  try {
    const hashedPassword = await bcrypt.hash(user.password, ROUNDS);
    const saved = new UserDao({ ...user, password: hashedPassword });

    return await saved.save();
  } catch (error) {
    throw new Error("Unable to create user at this time");
  }
}
