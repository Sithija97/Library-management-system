import { UserRoles } from "../enums";

export type User = {
  _id: string;
  type: UserRoles;
  firstName: string;
  lastName: string;
  email: string;
};

export type LoginUserPayload = {
  email: string;
  password: string;
};

export type RegisterUserPayload = {
  type: UserRoles;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
