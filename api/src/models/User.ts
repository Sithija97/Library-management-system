import mongoose, { Document, mongo, Schema } from "mongoose";
import { IUser } from "../interfaces/User";

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IUserModel>("User", UserSchema);
