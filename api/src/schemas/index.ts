import { z } from "zod";

const createSchema = z.object({
  type: z.enum(["ADMIN", "EMPLOYEE", "PATRON"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const userIdSchema = z.object({
  userId: z.string().regex(/^[a-f0-9]{24}$/, "Invalid user ID format"),
});

const updateUserSchema = z.object({
  _id: z.string().uuid("Invalid user ID format"),
  type: z.enum(["ADMIN", "EMPLOYEE", "PATRON"]).optional(),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
});

export const Schemas = {
  user: {
    create: createSchema,
    login: loginSchema,
    userId: userIdSchema,
    update: updateUserSchema,
  },
};
