import express from "express";
import AuthController from "../controllers/AuthController";

const rounter = express.Router();

rounter.post("/register", AuthController.handleRegister);

export default rounter;
