import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status ? err.status : 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || [];

  res.status(status).json({
    message,
    errors,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}

export default errorHandler;
