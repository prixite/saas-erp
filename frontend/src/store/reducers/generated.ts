import { emptySplitApi as api } from "@src/store/emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    apiChangePasswordPartialUpdate: build.mutation<
      ApiChangePasswordPartialUpdateApiResponse,
      ApiChangePasswordPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/change_password/`,
        method: "PATCH",
        body: queryArg.patchedUserPassword,
      }),
    }),
    apiEmployeesList: build.query<
      ApiEmployeesListApiResponse,
      ApiEmployeesListApiArg
    >({
      query: () => ({ url: `/api/employees/` }),
    }),
    apiEmployeesCreate: build.mutation<
      ApiEmployeesCreateApiResponse,
      ApiEmployeesCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/employees/`,
        method: "POST",
        body: queryArg.employee,
      }),
    }),
    apiEmployeesRetrieve: build.query<
      ApiEmployeesRetrieveApiResponse,
      ApiEmployeesRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/employees/${queryArg.id}/` }),
    }),
    apiEmployeesCompensationRetrieve: build.query<
      ApiEmployeesCompensationRetrieveApiResponse,
      ApiEmployeesCompensationRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/employees/${queryArg.id}/compensation/`,
      }),
    }),
    apiEmployeesCompensationCreate: build.mutation<
      ApiEmployeesCompensationCreateApiResponse,
      ApiEmployeesCompensationCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/employees/${queryArg.id}/compensation/`,
        method: "POST",
        body: queryArg.compensation,
      }),
    }),
    apiEmployeesDocumentsList: build.query<
      ApiEmployeesDocumentsListApiResponse,
      ApiEmployeesDocumentsListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/employees/${queryArg.id}/documents/`,
      }),
    }),
    apiEmployeesDocumentsCreate: build.mutation<
      ApiEmployeesDocumentsCreateApiResponse,
      ApiEmployeesDocumentsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/employees/${queryArg.id}/documents/`,
        method: "POST",
        body: queryArg.document,
      }),
    }),
    apiMeRetrieve: build.query<ApiMeRetrieveApiResponse, ApiMeRetrieveApiArg>({
      query: () => ({ url: `/api/me/` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as rtk };
export type ApiChangePasswordPartialUpdateApiResponse =
  /** status 200  */ UserPassword;
export type ApiChangePasswordPartialUpdateApiArg = {
  patchedUserPassword: PatchedUserPassword;
};
export type ApiEmployeesListApiResponse = /** status 200  */ EmployeeList[];
export type ApiEmployeesListApiArg = void;
export type ApiEmployeesCreateApiResponse = /** status 201  */ Employee;
export type ApiEmployeesCreateApiArg = {
  employee: Employee;
};
export type ApiEmployeesRetrieveApiResponse = /** status 200  */ Employee;
export type ApiEmployeesRetrieveApiArg = {
  id: number;
};
export type ApiEmployeesCompensationRetrieveApiResponse =
  /** status 200  */ Compensation;
export type ApiEmployeesCompensationRetrieveApiArg = {
  id: number;
};
export type ApiEmployeesCompensationCreateApiResponse =
  /** status 201  */ Compensation;
export type ApiEmployeesCompensationCreateApiArg = {
  id: number;
  compensation: Compensation;
};
export type ApiEmployeesDocumentsListApiResponse =
  /** status 200  */ Document[];
export type ApiEmployeesDocumentsListApiArg = {
  id: number;
};
export type ApiEmployeesDocumentsCreateApiResponse =
  /** status 201  */ Document;
export type ApiEmployeesDocumentsCreateApiArg = {
  id: number;
  document: Document;
};
export type ApiMeRetrieveApiResponse = /** status 200  */ Me;
export type ApiMeRetrieveApiArg = void;
export type UserPassword = {
  password: string;
  old_password: string;
};
export type PatchedUserPassword = {
  password?: string;
  old_password?: string;
};
export type EmployeeList = {
  id: number;
  org_id: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  date_of_joining: string;
  avatar: string;
};
export type EmployeeUser = {
  first_name?: string;
  last_name?: string;
  email: string;
  avatar: string;
  contact_number: string;
};
export type Degree = {
  program: string;
  institute: string;
  year: string;
};
export type Experirence = {
  title: string;
  company: string;
  start_date: string;
  end_date: string;
};
export type Employee = {
  id: number;
  user: EmployeeUser;
  degrees: Degree[];
  experience: Experirence[];
  benefits: string[];
  org_id: string;
  total_experience: string;
  nic: string;
  date_of_joining: string;
  emergency_contact_number: string;
  designation: string;
  user_allowed?: boolean;
  created_at: string;
  updated_at: string;
  organization: number;
  department?: number | null;
  manager?: number | null;
  type?: number | null;
};
export type Compensation = {
  id: number;
  current_salary: number;
  rate: number;
  max_hours_per_week?: number | null;
  expected_hours_per_week?: number | null;
  updated_at: string;
  compensation_type: number;
  compensation_schedule: number;
  currency: number;
};
export type Document = {
  id: number;
  name: string;
  type?: number | null;
  document_url: string;
};
export type Me = {
  first_name?: string;
  last_name?: string;
  email: string;
  organization?: string;
  avatar: string;
  is_superuser?: boolean;
  headline: string;
  contact_number: string;
};
export const {
  useApiChangePasswordPartialUpdateMutation,
  useApiEmployeesListQuery,
  useApiEmployeesCreateMutation,
  useApiEmployeesRetrieveQuery,
  useApiEmployeesCompensationRetrieveQuery,
  useApiEmployeesCompensationCreateMutation,
  useApiEmployeesDocumentsListQuery,
  useApiEmployeesDocumentsCreateMutation,
  useApiMeRetrieveQuery,
} = injectedRtkApi;
