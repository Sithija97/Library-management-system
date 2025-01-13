import { z } from "zod";

export interface IUser {
  type: "ADMIN" | "EMPLOYEE" | "PATRON";
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const userSchema = z.object({
  type: z.enum(["ADMIN", "EMPLOYEE", "PATRON"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
