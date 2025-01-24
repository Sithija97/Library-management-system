import express from "express";
import libraryCardController from "../controllers/library-card.controller";
import { validate } from "../middleware/validation.middleware";
import { Schemas } from "../schemas";

const router = express.Router();

router.get(
  "/:cardId",
  validate(Schemas.libraryCard.get),
  libraryCardController.getLibraryCard
);
validate(Schemas.libraryCard.create),
  router.post("/", libraryCardController.createLibraryCard);

export default router;
