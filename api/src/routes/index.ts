import { Express, Request, Response } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

export function registerRoutes(app: Express) {
  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
}
