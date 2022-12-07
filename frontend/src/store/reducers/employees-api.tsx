/* eslint-disable import/no-unresolved */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Employee,
  EmployeeData,
  User,
  Flags,
} from "@src/helpers/interfaces/employees-modal";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees/",
    }),
    getEmployeeData: builder.query<EmployeeData, { id: number }>({
      query: ({ id }) => `/employees/${id}/`,
    }),
    getEmployeeDocs: builder.query({
      query: ({ employeeId }) => `/employees/${employeeId}/documents/`,
    }),
    getUser: builder.query<User, void>({
      query: () => `/me/`,
    }),
    getFlags: builder.query<Flags[], void>({
      query: () => "/flags/",
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeDataQuery,
  useGetEmployeeDocsQuery,
  useGetUserQuery,
  useGetFlagsQuery,
} = employeesApi;
