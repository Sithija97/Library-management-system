import express from "express";
import UserController from "../controllers/user.controller";
import { validate } from "../middleware/validation.middleware";
import { Schemas } from "../schemas";

const rounter = express.Router();

rounter.get("/", UserController.getAllUsers);
rounter.get(
  "/:userId",
  validate(Schemas.user.userId),
  UserController.getUserById
);
rounter.put("/", validate(Schemas.user.update), UserController.updateUser);
rounter.delete(
  "/:userId",
  validate(Schemas.user.userId),
  UserController.deleteUser
);

export default rounter;
