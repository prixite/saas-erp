/* eslint-disable import/no-unresolved */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee } from "@src/helpers/interfaces/employees-modal";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees",
    }),
  }),
});

export const { useGetEmployeesQuery } = employeesApi;
