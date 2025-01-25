import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FetchUserPayload,
  LoginUserPayload,
  RegisterUserPayload,
  User,
} from "../../models/user";
import UserService from "../../services/authentication";
import { LoadingStates } from "../../enums";
import { LoanRecord } from "../../models/loan-record";

type AuthenticationState = {
  [key: string]: any;
  loggedInUser: User | undefined;
  profileUser: User | undefined;
  libraryCard: string;
  profileUserRecords: LoanRecord[];
  loginUserStatus: string;
  loginUserError: boolean;
  loginUserSuccess: boolean;
  registerUserStatus: string;
  registerUserError: boolean;
  registerUserSuccess: boolean;
  fetchUserStatus: string;
  fetchUserError: boolean;
  fetchUserSuccess: boolean;
  updateUserStatus: string;
  updateUserError: boolean;
  updateUserSuccess: boolean;
  getLibraryCardStatus: string;
  getLibraryCardError: boolean;
  getLibraryCardSuccess: boolean;
  getProfileUserRecordsStatus: string;
  getProfileUserRecordsError: boolean;
  getProfileUserRecordsSuccess: boolean;
};

const initialState: AuthenticationState = {
  loggedInUser: undefined,
  profileUser: undefined,
  libraryCard: "",
  profileUserRecords: [],
  loginUserStatus: LoadingStates.IDLE,
  loginUserError: false,
  loginUserSuccess: false,
  registerUserStatus: LoadingStates.IDLE,
  registerUserError: false,
  registerUserSuccess: false,
  fetchUserStatus: LoadingStates.IDLE,
  fetchUserError: false,
  fetchUserSuccess: false,
  updateUserStatus: LoadingStates.IDLE,
  updateUserError: false,
  updateUserSuccess: false,
  getLibraryCardStatus: LoadingStates.IDLE,
  getLibraryCardError: false,
  getLibraryCardSuccess: false,
  getProfileUserRecordsStatus: LoadingStates.IDLE,
  getProfileUserRecordsError: false,
  getProfileUserRecordsSuccess: false,
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

export const fetchUser = createAsyncThunk(
  "auth/fetch",
  async (payload: FetchUserPayload, thunkAPI) => {
    try {
      const user = await UserService.fetch(payload);
      return {
        user,
        property: payload.property,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async (payload: User, thunkAPI) => {
    try {
      const response = await UserService.update(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getLibraryCard = createAsyncThunk(
  "auth/getLibraryCard",
  async (userId: string, thunkAPI) => {
    try {
      const response = await UserService.getCard(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProfileUserRecords = createAsyncThunk(
  "auth/getProfileUserRecords",
  async (userId: string, thunkAPI) => {
    try {
      const response = await UserService.fetchUserRecords(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetUser(state, action: PayloadAction<string>) {
      state[action.payload] = undefined;
    },
    resetRegisterSuccess(state) {
      state.registerUserSuccess = false;
    },
    resetAuthState(state) {
      Object.assign(state, initialState);
    },
    resetProfileUserRecords(state) {
      state.profileUserRecords = [];
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
        state.loginUserSuccess = true;
        state.loggedInUser = action.payload;
        state.loginUserStatus = LoadingStates.SUCCESS;
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
      })

      // fetch
      .addCase(fetchUser.pending, (state) => {
        state.fetchUserStatus = LoadingStates.LOADING;
        state.fetchUserError = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchUserSuccess = true;
        state[action.payload.property] = action.payload.user;
        state.fetchUserStatus = LoadingStates.SUCCESS;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.fetchUserStatus = LoadingStates.FAILURE;
        state.fetchUserError = true;
      })

      // update
      .addCase(updateUser.pending, (state) => {
        state.updateUserStatus = LoadingStates.LOADING;
        state.updateUserError = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserSuccess = true;
        state.loggedInUser = action.payload;
        state.profileUser = action.payload;
        state.updateUserStatus = LoadingStates.SUCCESS;
      })
      .addCase(updateUser.rejected, (state) => {
        state.updateUserStatus = LoadingStates.FAILURE;
        state.updateUserError = true;
      })

      // get library card
      .addCase(getLibraryCard.pending, (state) => {
        state.getLibraryCardStatus = LoadingStates.LOADING;
        state.getLibraryCardError = false;
      })
      .addCase(getLibraryCard.fulfilled, (state, action) => {
        state.getLibraryCardSuccess = true;
        state.libraryCard = action.payload._id;
        state.getLibraryCardStatus = LoadingStates.SUCCESS;
      })
      .addCase(getLibraryCard.rejected, (state) => {
        state.getLibraryCardStatus = LoadingStates.FAILURE;
        state.getLibraryCardError = true;
      })

      // get user loan records
      .addCase(getProfileUserRecords.pending, (state) => {
        state.getProfileUserRecordsStatus = LoadingStates.LOADING;
        state.getProfileUserRecordsError = false;
      })
      .addCase(getProfileUserRecords.fulfilled, (state, action) => {
        state.getProfileUserRecordsSuccess = true;
        state.profileUserRecords = action.payload;
        state.getProfileUserRecordsStatus = LoadingStates.SUCCESS;
      })
      .addCase(getProfileUserRecords.rejected, (state) => {
        state.getProfileUserRecordsStatus = LoadingStates.FAILURE;
        state.getProfileUserRecordsError = true;
      });
  },
});

export const {
  resetUser,
  resetAuthState,
  resetRegisterSuccess,
  resetProfileUserRecords,
} = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
