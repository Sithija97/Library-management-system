import { Express, Request, Response } from "express";
import authRoutes from "./auth.routes";

export function registerRoutes(app: Express) {
  app.use("/auth", authRoutes);
}
