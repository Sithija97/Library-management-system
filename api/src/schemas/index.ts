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

export const Schemas = {
  user: {
    create: createSchema,
    login: loginSchema,
  },
};
