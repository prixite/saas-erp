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
    baseUrl: "/api/",
    prepareHeaders: (headers) => {
      headers.append("Content-Type", "application/json");
      headers.set("X-CSRFToken", document.forms.csrf.csrfmiddlewaretoken.value);
      return headers;
    },
  }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeeData[], void>({
      query: () => "/employees/",
      providesTags: ["Employee"],
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
      query: ({ id }) => {
        return {
          url: `/employees/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Employee"],
    }),
    createEmployee: builder.mutation<EmployeeData[], EmployeeData[]>({
      query: () => {
        return {
          url: "/employees/",
          method: "POST",
        };
      },
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
  useCreateEmployeeMutation,
} = employeesApi;
