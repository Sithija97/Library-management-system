import { z } from "zod";

export const createLoanSchema = z.object({
  status: z.enum(["AVAILABLE", "LOANED"]),
  loanedDate: z.string().or(z.date()),
  dueDate: z.string().or(z.date()),
  returnedDte: z.string().or(z.date()).optional(),
  patron: z.string().regex(/^[0-9a-fA-F]{24}$/),
  employeeOut: z.string().regex(/^[0-9a-fA-F]{24}$/),
  employeeIn: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  item: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

export const updateLoanSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  status: z.enum(["AVAILABLE", "LOANED"]),
  loanedDate: z.string().or(z.date()),
  dueDate: z.string().or(z.date()),
  returnedDte: z.string().or(z.date()).optional(),
  patron: z.string().regex(/^[0-9a-fA-F]{24}$/),
  employeeOut: z.string().regex(/^[0-9a-fA-F]{24}$/),
  employeeIn: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  item: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

export const queryLoanSchema = z.object({
  property: z.enum([
    "_id",
    "status",
    "loanedDate",
    "dueDate",
    "returnedDte",
    "patron",
    "employeeOut",
    "employeeIn",
    "item",
  ]),
  value: z.union([z.string(), z.date()]),
});
