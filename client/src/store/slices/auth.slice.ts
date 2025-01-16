import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUserPayload, User } from "../../models/user";
import UserService from "../../services/authentication";
import { LoadingStates } from "../../enums";

type AuthenticationState = {
  loggedInUser: User | undefined;
  loginUserStatus: string;
  loginUserError: boolean;
  loginUserSuccess: boolean;
};

const initialState: AuthenticationState = {
  loggedInUser: undefined,
  loginUserStatus: LoadingStates.IDLE,
  loginUserError: false,
  loginUserSuccess: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user: LoginUserPayload, thunkAPI) => {
    try {
      const response = UserService.login(user);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const AuthenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loginUserStatus = LoadingStates.LOADING;
        state.loginUserError = false;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loginUserStatus = LoadingStates.SUCCESS;
        state.loginUserSuccess = true;
        state.loggedInUser = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginUserStatus = LoadingStates.FAILURE;
        state.loginUserError = true;
      });
  },
});

// export const {} = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
