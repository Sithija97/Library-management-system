import express from "express";
import loanRecordController from "../controllers/loan-record.controller";
import { validate } from "../middleware/validation.middleware";
import { Schemas } from "../schemas";

const router = express.Router();

router.get("/", loanRecordController.getAllRecords);
router.post(
  "/",
  validate(Schemas.loan.create),
  loanRecordController.createRecord
);
router.put(
  "/",
  validate(Schemas.loan.update),
  loanRecordController.updateRecord
);
router.post(
  "/query",
  validate(Schemas.loan.query),
  loanRecordController.getRecordsByProperty
);

export default router;
