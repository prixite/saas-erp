/* eslint-disable import/no-unresolved */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  EmployeeData,
  User,
  Flags,
  Employee,
  Benefits,
  EmployeementTypes,
  ProgramsTypes,
  InstituteTypes,
  CompaniesTypes,
  departmentsTypes,
  roleTypes,
} from "@src/helpers/interfaces/employees-modal";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers) => {
      headers.append("Content-Type", "application/json");
      headers.set("X-CSRFToken", document.forms.csrf.csrfmiddlewaretoken.value);
      localStorage.getItem("token") &&
        headers.set("Authorization", `Token ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees/",
      providesTags: ["Employee"],
    }),
    getEmployeeData: builder.query<EmployeeData, { id: number }>({
      query: ({ id }) => `/employees/${id}/`,
      providesTags: ["Employee"],
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
    getEmployeementTypes: builder.query<EmployeementTypes[], void>({
      query: () => "/employeement_type/",
    }),
    getCompanies: builder.query<CompaniesTypes[], void>({
      query: () => "/companies/",
    }),
    getPrograms: builder.query<ProgramsTypes[], void>({
      query: () => "/programs/",
    }),
    getInstitute: builder.query<InstituteTypes[], void>({
      query: () => "/institues/",
    }),
    getRoles: builder.query<roleTypes[], void>({
      query: () => "/role/",
    }),
    getBenefits: builder.query<Benefits[], void>({
      query: () => "/benefits/",
    }),
    getDepartments: builder.query<departmentsTypes[], void>({
      query: () => "/department/",
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
    createEmployee: builder.mutation({
      query: (employeeObject) => {
        return {
          url: "/employees/",
          method: "POST",
          body: employeeObject,
        };
      },
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation({
      query: ({ updatedObj, id }) => {
        return {
          url: `/employees/${id}/`,
          method: "PUT",
          body: updatedObj,
        };
      },
      invalidatesTags: ["Employee"],
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
  useGetEmployeementTypesQuery,
  useGetCompaniesQuery,
  useGetProgramsQuery,
  useGetInstituteQuery,
  useGetRolesQuery,
  useGetDepartmentsQuery,
  useUpdateEmployeeMutation,
} = employeesApi;
