import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  displayLogin: boolean;
  displayLibraryCard: boolean;
  displayLoan: boolean;
};

const initialState: ModalState = {
  displayLogin: true,
  displayLibraryCard: false,
  displayLoan: false,
};

export const ModalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setDisplayLogin(state, action: PayloadAction<boolean>) {
      state.displayLogin = action.payload;
    },
    setDisplayLibraryCard(state, action: PayloadAction<boolean>) {
      state.displayLibraryCard = action.payload;
    },
    setDisplayLoan(state, action: PayloadAction<boolean>) {
      state.displayLoan = action.payload;
    },
  },
});

export const { setDisplayLogin, setDisplayLibraryCard, setDisplayLoan } =
  ModalSlice.actions;

export default ModalSlice.reducer;
