import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../models";
import BookService from "../../services/books";
import { LoadingStates } from "../../enums";

type BooksState = {
  books: Book[];
  fetchAllBooksStatus: string;
  fetchAllBooksError: boolean;
  fetchAllBooksSuccess: boolean;
};

const initialState: BooksState = {
  books: [],
  fetchAllBooksStatus: LoadingStates.IDLE,
  fetchAllBooksError: false,
  fetchAllBooksSuccess: false,
};

export const fetchAllBooks = createAsyncThunk(
  "books/all",
  async (_, thunkAPI) => {
    try {
      const response = await BookService.fetchAll();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const BookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchAllBooks.pending, (state) => {
        state.fetchAllBooksStatus = LoadingStates.LOADING;
        state.fetchAllBooksError = false;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.fetchAllBooksSuccess = true;
        state.books = action.payload;
        state.fetchAllBooksStatus = LoadingStates.SUCCESS;
      })
      .addCase(fetchAllBooks.rejected, (state) => {
        state.fetchAllBooksStatus = LoadingStates.FAILURE;
        state.fetchAllBooksError = true;
      });
  },
});

// export const { } = BookSlice.actions;

export default BookSlice.reducer;
