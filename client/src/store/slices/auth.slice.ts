import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUserPayload, RegisterUserPayload, User } from "../../models/user";
import UserService from "../../services/authentication";
import { LoadingStates } from "../../enums";

type AuthenticationState = {
  loggedInUser: User | undefined;
  loginUserStatus: string;
  loginUserError: boolean;
  loginUserSuccess: boolean;
  registerUserStatus: string;
  registerUserError: boolean;
  registerUserSuccess: boolean;
};

const initialState: AuthenticationState = {
  loggedInUser: undefined,
  loginUserStatus: LoadingStates.IDLE,
  loginUserError: false,
  loginUserSuccess: false,
  registerUserStatus: LoadingStates.IDLE,
  registerUserError: false,
  registerUserSuccess: false,
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

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: RegisterUserPayload, thunkAPI) => {
    try {
      const response = UserService.register(user);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const AuthenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetRegisterSuccess(state) {
      state.registerUserSuccess = false;
    },
  },
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
      })

      // register
      .addCase(registerUser.pending, (state) => {
        state.registerUserStatus = LoadingStates.LOADING;
        state.registerUserError = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerUserStatus = LoadingStates.SUCCESS;
        state.registerUserSuccess = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerUserStatus = LoadingStates.FAILURE;
        state.registerUserError = true;
      });
  },
});

export const { resetRegisterSuccess } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
