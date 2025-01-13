import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next({
          status: 400,
          message: "Validation error",
          errors: error.errors.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
