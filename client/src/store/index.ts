import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./slices/auth.slice";
import ModalReducer from "./slices/modal.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication"],
};

const persistedReducer = persistReducer(persistConfig, AuthenticationReducer);

export const store = configureStore({
  reducer: {
    authentication: persistedReducer,
    modal: ModalReducer,
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
