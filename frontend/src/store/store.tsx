/* eslint-disable import/no-unresolved */
import { configureStore } from "@reduxjs/toolkit";
import { employeesApi } from "@src/store/reducers/employees-api";
import { emptySplitApi } from "@src/store/emptyApi";

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(emptySplitApi.middleware)
      .concat(employeesApi.middleware),
});
