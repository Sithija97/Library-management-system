import {
  createSchema,
  loginSchema,
  updateUserSchema,
  userIdSchema,
} from "./user";
import { createBookSchema, updateBookSchema, deleteBookSchema } from "./book";
import { createCardSchema, getSchema } from "./library-card";
import { createLoanSchema, queryLoanSchema, updateLoanSchema } from "./loan";

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
  libraryCard: {
    create: createCardSchema,
    get: getSchema,
  },
  loan: {
    create: createLoanSchema,
    update: updateLoanSchema,
    query: queryLoanSchema,
  },
};
