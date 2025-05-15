import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "@/hooks/reducers/api";
import { apiInt } from "@/hooks/reducers/api_int";
import { auth } from "@/hooks/reducers/auth";
import { EnvConfig } from "@/utils/constants/env.config";

import filterData from "@/hooks/reducers/filter";

import cartReducer from "@/hooks/slices/cart";
import appReducer from "@/hooks/slices/app";

const config = EnvConfig();
export const store = configureStore({
  reducer: {
    filterData,
    cart: cartReducer,
    app: appReducer,
    [api.reducerPath]: api.reducer,
    [apiInt.reducerPath]: apiInt.reducer,
    [auth.reducerPath]: auth.reducer,
  },
  devTools: config.mode !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      api.middleware,
      apiInt.middleware,
      auth.middleware,
    ]),
});

setupListeners(store.dispatch);

export interface Auth {
  mutations: Array<{
    data?: {
      token?: string;
    };
  }>;
}

export type RootState = ReturnType<typeof store.getState> & {
  auth: Auth;
};
export type AppDispatch = typeof store.dispatch;
