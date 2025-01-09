import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { myApi } from "./authApi";
import UserSlice from "./UserSlice";
import { reviewsApi } from "./reviewsApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: UserSlice,
  [myApi.reducerPath]: myApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(myApi.middleware)
      .concat(reviewsApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
