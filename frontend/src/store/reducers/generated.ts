import { emptySplitApi as api } from "@src/store/emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
  contact_number: string;
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
  current_salary: number;
  currency: number;
  compensation_type: number;
  compensation_schedule: number;
};
export type Document = {
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
};
export const {
  useApiEmployeesListQuery,
  useApiEmployeesCreateMutation,
  useApiEmployeesRetrieveQuery,
  useApiEmployeesCompensationRetrieveQuery,
  useApiEmployeesDocumentsListQuery,
  useApiEmployeesDocumentsCreateMutation,
  useApiMeRetrieveQuery,
} = injectedRtkApi;
