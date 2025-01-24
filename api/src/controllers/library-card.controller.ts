import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ILibraryCard } from "../interfaces/LibraryCard";
import {
  findLibraryCard,
  registerLibraryCard,
} from "../services/library-card.service";

const getLibraryCard = asyncHandler(async (req: Request, res: Response) => {
  const { cardId } = req.params;
  const card = await findLibraryCard(cardId);

  res.status(200).json({ message: "retreived the user's card.", card });
});

const createLibraryCard = asyncHandler(async (req: Request, res: Response) => {
  const card: ILibraryCard = req.body;
  const libraryCard = await registerLibraryCard(card);

  res
    .status(201)
    .json({ message: "generated library card for user.", libraryCard });
});

export default {
  getLibraryCard,
  createLibraryCard,
};
