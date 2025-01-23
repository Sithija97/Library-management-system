import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book, PageInfo } from "../../models";
import BookService from "../../services/books";
import { LoadingStates } from "../../enums";

type BooksState = {
  books: Book[];
  pagingInformation: PageInfo | null;
  fetchAllBooksStatus: string;
  fetchAllBooksError: boolean;
  fetchAllBooksSuccess: boolean;
  queryBooksStatus: string;
  queryBooksSuccess: boolean;
  queryBooksError: boolean;
};

const initialState: BooksState = {
  books: [],
  pagingInformation: null,
  fetchAllBooksStatus: LoadingStates.IDLE,
  fetchAllBooksError: false,
  fetchAllBooksSuccess: false,
  queryBooksStatus: LoadingStates.IDLE,
  queryBooksError: false,
  queryBooksSuccess: false,
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

export const queryBooks = createAsyncThunk(
  "books/query",
  async (payload: string, thunkAPI) => {
    try {
      const response = await BookService.query(payload);
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
      })

      // query
      .addCase(queryBooks.pending, (state) => {
        state.queryBooksStatus = LoadingStates.LOADING;
        state.queryBooksError = false;
      })
      .addCase(queryBooks.fulfilled, (state, action) => {
        state.queryBooksSuccess = true;
        state.books = action.payload.items;
        state.pagingInformation = {
          totalCount: action.payload.totalCount,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          limit: action.payload.limit,
          pageCount: action.payload.pageCount,
        };
        state.queryBooksStatus = LoadingStates.SUCCESS;
      })
      .addCase(queryBooks.rejected, (state) => {
        state.queryBooksStatus = LoadingStates.FAILURE;
        state.queryBooksError = true;
      });
  },
});

// export const { } = BookSlice.actions;

export default BookSlice.reducer;
