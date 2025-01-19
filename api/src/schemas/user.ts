import { z } from "zod";

export const createSchema = z.object({
  type: z.enum(["ADMIN", "EMPLOYEE", "PATRON"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const userIdSchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
});

export const updateUserSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
  type: z.enum(["ADMIN", "EMPLOYEE", "PATRON"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
