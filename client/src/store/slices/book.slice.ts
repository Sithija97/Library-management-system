import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Book,
  CheckinBookPayload,
  CheckoutBookPayload,
  PageInfo,
} from "../../models";
import BookService from "../../services/books";
import { LoadingStates } from "../../enums";
import libraryCardService from "../../services/cards";
import loanService from "../../services/loans";

type BooksState = {
  books: Book[];
  currentBook: Book | undefined;
  pagingInformation: PageInfo | null;
  fetchAllBooksStatus: string;
  fetchAllBooksError: boolean;
  fetchAllBooksSuccess: boolean;
  queryBooksStatus: string;
  queryBooksSuccess: boolean;
  queryBooksError: boolean;
  checkoutBookStatus: string;
  checkoutBookSuccess: boolean;
  checkoutBookError: boolean;
  checkinBookStatus: string;
  checkinBookSuccess: boolean;
  checkinBookError: boolean;
};

const initialState: BooksState = {
  books: [],
  currentBook: undefined,
  pagingInformation: null,
  fetchAllBooksStatus: LoadingStates.IDLE,
  fetchAllBooksError: false,
  fetchAllBooksSuccess: false,
  queryBooksStatus: LoadingStates.IDLE,
  queryBooksError: false,
  queryBooksSuccess: false,
  checkoutBookStatus: LoadingStates.IDLE,
  checkoutBookSuccess: false,
  checkoutBookError: false,
  checkinBookStatus: LoadingStates.IDLE,
  checkinBookSuccess: false,
  checkinBookError: false,
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

export const checkoutBook = createAsyncThunk(
  "books/checkout",
  async (paylod: CheckoutBookPayload, thunkAPI) => {
    try {
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 14);

      const patron = await libraryCardService.getCard(paylod.libraryCard);
      const patronId = patron.user._id;

      const record = {
        status: "LOANED",
        loanedDate: new Date(),
        dueDate: returnDate,
        patron: patronId,
        employeeOut: paylod.employee._id,
        item: paylod.book._id,
      };

      const loan = await loanService.createLoan(record);
      return loan;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkinBook = createAsyncThunk(
  "books/checkin",
  async (paylod: CheckinBookPayload, thunkAPI) => {
    try {
      const record = paylod.book.records[0];

      const updatedRecord = {
        _id: record._id,
        status: "AVAILABLE",
        loanedDate: record.loanedDate,
        dueDate: record.dueDate,
        returnedDate: record.returnedDate,
        patron: record.patron,
        employeeOut: record.employeeOut,
        employeeIn: paylod.employee._id,
        item: record.item,
      };

      const loan = await loanService.updateLoan(updatedRecord);
      return loan;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const BookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setCurrentBook: (state, action) => {
      state.currentBook = action.payload;
    },
  },
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
      })

      //checkout book
      .addCase(checkoutBook.pending, (state) => {
        state.checkoutBookStatus = LoadingStates.LOADING;
        state.checkoutBookError = false;
      })
      .addCase(checkoutBook.fulfilled, (state, action) => {
        let bookList: Book[] = JSON.parse(JSON.stringify(state.books));
        bookList = bookList.map((book) => {
          if (book._id === action.payload.item) {
            book.records = [action.payload, ...book.records];
            return book;
          }
          return book;
        });

        state.books = bookList;

        state.checkoutBookSuccess = true;
        state.checkoutBookStatus = LoadingStates.SUCCESS;
      })
      .addCase(checkoutBook.rejected, (state) => {
        state.checkoutBookStatus = LoadingStates.FAILURE;
        state.checkoutBookError = true;
      })

      //checkin book
      .addCase(checkinBook.pending, (state) => {
        state.checkinBookStatus = LoadingStates.LOADING;
        state.checkinBookError = false;
      })
      .addCase(checkinBook.fulfilled, (state, action) => {
        let bookList: Book[] = JSON.parse(JSON.stringify(state.books));
        bookList = bookList.map((book) => {
          if (book._id === action.payload.item) {
            book.records.splice(0, 1, action.payload);
            return book;
          }
          return book;
        });

        state.books = bookList;

        state.checkinBookSuccess = true;
        state.checkinBookStatus = LoadingStates.SUCCESS;
      })
      .addCase(checkinBook.rejected, (state) => {
        state.checkinBookStatus = LoadingStates.FAILURE;
        state.checkinBookError = true;
      });
  },
});

export const { setCurrentBook } = BookSlice.actions;

export default BookSlice.reducer;
