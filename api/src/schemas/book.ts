import { z } from "zod";

export const createBookSchema = z.object({
  barcode: z
    .string()
    .regex(
      /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
      "Invalid user ID format"
    ),
  cover: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  description: z.string(),
  subjects: z.array(z.string()),
  publicationDate: z.string().or(z.date()),
  publisher: z.string(),
  pages: z.number(),
  genre: z.string(),
});

export const updateBookSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  barcode: z
    .string()
    .regex(
      /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
      "Invalid user ID format"
    ),
  cover: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  description: z.string(),
  subjects: z.array(z.string()),
  publicationDate: z.string().or(z.date()),
  publisher: z.string(),
  pages: z.number(),
  genre: z.string(),
});

export const deleteBookSchema = z.object({
  barcode: z
    .string()
    .regex(
      /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
      "Invalid user ID format"
    ),
});
