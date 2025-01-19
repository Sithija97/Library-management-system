import {
  createSchema,
  loginSchema,
  updateUserSchema,
  userIdSchema,
} from "./user";
import { createBookSchema, updateBookSchema, deleteBookSchema } from "./book";

export const Schemas = {
  user: {
    create: createSchema,
    login: loginSchema,
    userId: userIdSchema,
    update: updateUserSchema,
  },
  book: {
    create: createBookSchema,
    update: updateBookSchema,
    delete: deleteBookSchema,
  },
};
