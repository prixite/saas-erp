/* eslint-disable import/no-unresolved */
import { configureStore } from "@reduxjs/toolkit";
import { api } from "@src/store/api";
import { employeesApi } from "@src/store/reducers/employees-api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(employeesApi.middleware),
});
