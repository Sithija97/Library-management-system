import express from "express";
import AuthController from "../controllers/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { Schemas } from "../schemas";

const rounter = express.Router();

rounter.post(
  "/register",
  validate(Schemas.user.create),
  AuthController.handleRegister
);
rounter.post(
  "/login",
  validate(Schemas.user.login),
  AuthController.handleLogin
);

export default rounter;
