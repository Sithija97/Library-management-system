import { Express, Request, Response } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import bookRoutes from "./book.routes";
import cardRoutes from "./library-card.routes";

export function registerRoutes(app: Express) {
  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/book", bookRoutes);
  app.use("/card", cardRoutes);
}
