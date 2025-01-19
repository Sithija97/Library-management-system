import express from "express";
import BookController from "../controllers/book.controller";
import { validate } from "../middleware/validation.middleware";
import { Schemas } from "../schemas";

const router = express.Router();

router.post("/", validate(Schemas.book.create), BookController.createBook);
router.get("/", BookController.getAllBooks);
router.put("/", validate(Schemas.book.update), BookController.updateBook);
router.delete(
  "/:barcode",
  validate(Schemas.book.delete),
  BookController.deleteBook
);

export default router;
