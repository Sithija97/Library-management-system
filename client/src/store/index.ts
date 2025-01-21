import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./slices/auth.slice";
import ModalReducer from "./slices/modal.slice";
import BookReducer from "./slices/book.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["authentication"],
//   version: 1,
//   serialize: true,
// };

const authPersistConfig = {
  key: "authentication",

  storage,

  blacklist: [
    "loginUserStatus",
    "loginUserError",
    "loginUserSuccess",

    "registerUserStatus",
    "registerUserError",
    "registerUserSuccess",

    "fetchUserStatus",
    "fetchUserError",
    "fetchUserSuccess",
  ],
};

const persistedAuthenticationReducer = persistReducer(
  authPersistConfig,
  AuthenticationReducer
);

const rootReducer = combineReducers({
  authentication: persistedAuthenticationReducer,
  books: BookReducer,
  modal: ModalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
