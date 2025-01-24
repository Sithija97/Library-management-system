import mongoose, { Document, Schema } from "mongoose";
import { ILibraryCard } from "../interfaces/LibraryCard";

export interface ILibraryCardModel extends ILibraryCard, Document {}

const LibraryCardSchema = new Schema<ILibraryCardModel>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
});

export default mongoose.model<ILibraryCardModel>(
  "LibraryCard",
  LibraryCardSchema
);
