import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSliceReducer from "./slices/userSlice";
import { booksApi } from "./api/booksApi";
import { housesApi } from "./api/housesApi";
import { checkLoginMiddleware } from "../middleware/checkLoginMiddleware";

const rootReducer = combineReducers({
  user: userSliceReducer,
  [booksApi.reducerPath]: booksApi.reducer,
  [housesApi.reducerPath]: housesApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    booksApi.reducerPath,
    housesApi.reducerPath
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([checkLoginMiddleware, booksApi.middleware, housesApi.middleware]),
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
