/* eslint-disable import/no-unresolved */
import { configureStore } from "@reduxjs/toolkit";
import { employeesApi } from "@src/services/employees-api";

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeesApi.middleware),
});
