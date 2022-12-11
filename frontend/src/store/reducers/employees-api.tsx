/* eslint-disable import/no-unresolved */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  EmployeeData,
  User,
  Flags,
  Benefits,
} from "@src/helpers/interfaces/employees-modal";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeeData[], void>({
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
    getBenefits: builder.query<Benefits[], void>({
      query: () => "/benefits/",
    }),
    deleteEmployee: builder.mutation<void, { id: number }>({
      query: (id) => ({
        url: `/api/employees/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeDataQuery,
  useGetEmployeeDocsQuery,
  useGetUserQuery,
  useGetFlagsQuery,
  useGetBenefitsQuery,
  useDeleteEmployeeMutation,
} = employeesApi;
