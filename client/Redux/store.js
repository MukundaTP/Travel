import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { myApi } from "./authApi";
import UserSlice from "./UserSlice";
import { reviewsApi } from "./reviewsApi";
import { contactApi } from "./contactApi";
import { adminApi } from "./adminAuth";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: UserSlice,
  [myApi.reducerPath]: myApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(myApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(contactApi.middleware)
      .concat(adminApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
