import express from "express";
import AuthController from "../controllers/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { userSchema } from "../interfaces/User";

const rounter = express.Router();

rounter.post("/register", validate(userSchema), AuthController.handleRegister);

export default rounter;
