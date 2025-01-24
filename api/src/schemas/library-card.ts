import { z } from "zod";

export const createSchema = z.object({
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user Id"),
});

export const getSchema = z.object({
  cardId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid card ID"),
});
