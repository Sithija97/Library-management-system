import { ILibraryCard } from "../interfaces/LibraryCard";
import LibraryCard, { ILibraryCardModel } from "../models/LibraryCard";
import CustomError from "../utils/error.util";

export async function registerLibraryCard(
  card: ILibraryCard
): Promise<ILibraryCardModel> {
  try {
    const cardExists = await LibraryCard.findOne({ user: card.user }).populate(
      "user"
    );
    if (cardExists) {
      return cardExists;
    }
    const savedCard = new LibraryCard(card);
    return await savedCard.save();
  } catch (error) {
    throw new Error("unable to retreive the library card.");
  }
}

export async function findLibraryCard(
  libraryCardId: string
): Promise<ILibraryCardModel> {
  try {
    const card = await LibraryCard.findOne({ _id: libraryCardId }).populate(
      "user"
    );
    if (!card) {
      throw new CustomError("Library card does not exist", 404);
    }
    return card;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error("unable to create the library card at this time.");
  }
}
