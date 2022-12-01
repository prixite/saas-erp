import { emptySplitApi as api } from "@src/store/emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    apiBenefitsList: build.query<
      ApiBenefitsListApiResponse,
      ApiBenefitsListApiArg
    >({
      query: () => ({ url: `/api/benefits/` }),
    }),
    apiBenefitsCreate: build.mutation<
      ApiBenefitsCreateApiResponse,
      ApiBenefitsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/benefits/`,
        method: "POST",
        body: queryArg.benefit,
      }),
    }),
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
    apiCompaniesList: build.query<
      ApiCompaniesListApiResponse,
      ApiCompaniesListApiArg
    >({
      query: () => ({ url: `/api/companies/` }),
    }),
    apiCompaniesCreate: build.mutation<
      ApiCompaniesCreateApiResponse,
      ApiCompaniesCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/companies/`,
        method: "POST",
        body: queryArg.company,
      }),
    }),
    apiCompensationScheduleList: build.query<
      ApiCompensationScheduleListApiResponse,
      ApiCompensationScheduleListApiArg
    >({
      query: () => ({ url: `/api/compensation_schedule/` }),
    }),
    apiCompensationScheduleCreate: build.mutation<
      ApiCompensationScheduleCreateApiResponse,
      ApiCompensationScheduleCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/compensation_schedule/`,
        method: "POST",
        body: queryArg.compensationSchedule,
      }),
    }),
    apiCompensationTypeList: build.query<
      ApiCompensationTypeListApiResponse,
      ApiCompensationTypeListApiArg
    >({
      query: () => ({ url: `/api/compensation_type/` }),
    }),
    apiCompensationTypeCreate: build.mutation<
      ApiCompensationTypeCreateApiResponse,
      ApiCompensationTypeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/compensation_type/`,
        method: "POST",
        body: queryArg.compensationType,
      }),
    }),
    apiCurrencyList: build.query<
      ApiCurrencyListApiResponse,
      ApiCurrencyListApiArg
    >({
      query: () => ({ url: `/api/currency/` }),
    }),
    apiCurrencyCreate: build.mutation<
      ApiCurrencyCreateApiResponse,
      ApiCurrencyCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/currency/`,
        method: "POST",
        body: queryArg.currency,
      }),
    }),
    apiDegreesList: build.query<
      ApiDegreesListApiResponse,
      ApiDegreesListApiArg
    >({
      query: () => ({ url: `/api/degrees/` }),
    }),
    apiDegreesCreate: build.mutation<
      ApiDegreesCreateApiResponse,
      ApiDegreesCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/degrees/`,
        method: "POST",
        body: queryArg.degree,
      }),
    }),
    apiDepartmentList: build.query<
      ApiDepartmentListApiResponse,
      ApiDepartmentListApiArg
    >({
      query: () => ({ url: `/api/department/` }),
    }),
    apiDepartmentCreate: build.mutation<
      ApiDepartmentCreateApiResponse,
      ApiDepartmentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/department/`,
        method: "POST",
        body: queryArg.department,
      }),
    }),
    apiDocumentTypeList: build.query<
      ApiDocumentTypeListApiResponse,
      ApiDocumentTypeListApiArg
    >({
      query: () => ({ url: `/api/document_type/` }),
    }),
    apiDocumentTypeCreate: build.mutation<
      ApiDocumentTypeCreateApiResponse,
      ApiDocumentTypeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/document_type/`,
        method: "POST",
        body: queryArg.documentType,
      }),
    }),
    apiEmployeementTypeList: build.query<
      ApiEmployeementTypeListApiResponse,
      ApiEmployeementTypeListApiArg
    >({
      query: () => ({ url: `/api/employeement_type/` }),
    }),
    apiEmployeementTypeCreate: build.mutation<
      ApiEmployeementTypeCreateApiResponse,
      ApiEmployeementTypeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/employeement_type/`,
        method: "POST",
        body: queryArg.employeementType,
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
    apiEmployeesPartialUpdate: build.mutation<
      ApiEmployeesPartialUpdateApiResponse,
      ApiEmployeesPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/employees/${queryArg.id}/`,
        method: "PATCH",
        body: queryArg.patchedEmployeeUpdate,
      }),
    }),
    apiEmployeesDestroy: build.mutation<
      ApiEmployeesDestroyApiResponse,
      ApiEmployeesDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/employees/${queryArg.id}/`,
        method: "DELETE",
      }),
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
    apiExperiencesList: build.query<
      ApiExperiencesListApiResponse,
      ApiExperiencesListApiArg
    >({
      query: () => ({ url: `/api/experiences/` }),
    }),
    apiExperiencesCreate: build.mutation<
      ApiExperiencesCreateApiResponse,
      ApiExperiencesCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/experiences/`,
        method: "POST",
        body: queryArg.experirence,
      }),
    }),
    apiInstituesList: build.query<
      ApiInstituesListApiResponse,
      ApiInstituesListApiArg
    >({
      query: () => ({ url: `/api/institues/` }),
    }),
    apiInstituesCreate: build.mutation<
      ApiInstituesCreateApiResponse,
      ApiInstituesCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/institues/`,
        method: "POST",
        body: queryArg.institue,
      }),
    }),
    apiMeRetrieve: build.query<ApiMeRetrieveApiResponse, ApiMeRetrieveApiArg>({
      query: () => ({ url: `/api/me/` }),
    }),
    apiProgramsList: build.query<
      ApiProgramsListApiResponse,
      ApiProgramsListApiArg
    >({
      query: () => ({ url: `/api/programs/` }),
    }),
    apiProgramsCreate: build.mutation<
      ApiProgramsCreateApiResponse,
      ApiProgramsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/programs/`,
        method: "POST",
        body: queryArg.program,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as rtk };
export type ApiBenefitsListApiResponse = /** status 200  */ Benefit[];
export type ApiBenefitsListApiArg = void;
export type ApiBenefitsCreateApiResponse = /** status 201  */ Benefit;
export type ApiBenefitsCreateApiArg = {
  benefit: Benefit;
};
export type ApiChangePasswordPartialUpdateApiResponse =
  /** status 200  */ UserPassword;
export type ApiChangePasswordPartialUpdateApiArg = {
  patchedUserPassword: PatchedUserPassword;
};
export type ApiCompaniesListApiResponse = /** status 200  */ Company[];
export type ApiCompaniesListApiArg = void;
export type ApiCompaniesCreateApiResponse = /** status 201  */ Company;
export type ApiCompaniesCreateApiArg = {
  company: Company;
};
export type ApiCompensationScheduleListApiResponse =
  /** status 200  */ CompensationSchedule[];
export type ApiCompensationScheduleListApiArg = void;
export type ApiCompensationScheduleCreateApiResponse =
  /** status 201  */ CompensationSchedule;
export type ApiCompensationScheduleCreateApiArg = {
  compensationSchedule: CompensationSchedule;
};
export type ApiCompensationTypeListApiResponse =
  /** status 200  */ CompensationType[];
export type ApiCompensationTypeListApiArg = void;
export type ApiCompensationTypeCreateApiResponse =
  /** status 201  */ CompensationType;
export type ApiCompensationTypeCreateApiArg = {
  compensationType: CompensationType;
};
export type ApiCurrencyListApiResponse = /** status 200  */ Currency[];
export type ApiCurrencyListApiArg = void;
export type ApiCurrencyCreateApiResponse = /** status 201  */ Currency;
export type ApiCurrencyCreateApiArg = {
  currency: Currency;
};
export type ApiDegreesListApiResponse = /** status 200  */ Degree[];
export type ApiDegreesListApiArg = void;
export type ApiDegreesCreateApiResponse = /** status 201  */ Degree;
export type ApiDegreesCreateApiArg = {
  degree: Degree;
};
export type ApiDepartmentListApiResponse = /** status 200  */ Department[];
export type ApiDepartmentListApiArg = void;
export type ApiDepartmentCreateApiResponse = /** status 201  */ Department;
export type ApiDepartmentCreateApiArg = {
  department: Department;
};
export type ApiDocumentTypeListApiResponse = /** status 200  */ DocumentType[];
export type ApiDocumentTypeListApiArg = void;
export type ApiDocumentTypeCreateApiResponse = /** status 201  */ DocumentType;
export type ApiDocumentTypeCreateApiArg = {
  documentType: DocumentType;
};
export type ApiEmployeementTypeListApiResponse =
  /** status 200  */ EmployeementType[];
export type ApiEmployeementTypeListApiArg = void;
export type ApiEmployeementTypeCreateApiResponse =
  /** status 201  */ EmployeementType;
export type ApiEmployeementTypeCreateApiArg = {
  employeementType: EmployeementType;
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
export type ApiEmployeesPartialUpdateApiResponse =
  /** status 200  */ EmployeeUpdate;
export type ApiEmployeesPartialUpdateApiArg = {
  id: number;
  patchedEmployeeUpdate: PatchedEmployeeUpdate;
};
export type ApiEmployeesDestroyApiResponse = unknown;
export type ApiEmployeesDestroyApiArg = {
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
export type ApiExperiencesListApiResponse = /** status 200  */ Experirence[];
export type ApiExperiencesListApiArg = void;
export type ApiExperiencesCreateApiResponse = /** status 201  */ Experirence;
export type ApiExperiencesCreateApiArg = {
  experirence: Experirence;
};
export type ApiInstituesListApiResponse = /** status 200  */ Institue[];
export type ApiInstituesListApiArg = void;
export type ApiInstituesCreateApiResponse = /** status 201  */ Institue;
export type ApiInstituesCreateApiArg = {
  institue: Institue;
};
export type ApiMeRetrieveApiResponse = /** status 200  */ Me;
export type ApiMeRetrieveApiArg = void;
export type ApiProgramsListApiResponse = /** status 200  */ Program[];
export type ApiProgramsListApiArg = void;
export type ApiProgramsCreateApiResponse = /** status 201  */ Program;
export type ApiProgramsCreateApiArg = {
  program: Program;
};
export type Benefit = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
export type UserPassword = {
  password: string;
  old_password: string;
};
export type PatchedUserPassword = {
  password?: string;
  old_password?: string;
};
export type Company = {
  id: number;
  name: string;
  image?: string | null;
  created_at: string;
  updated_at: string;
};
export type CompensationSchedule = {
  id: number;
  name: string;
  is_weekly?: boolean;
  is_monthly?: boolean;
  created_at: string;
  updated_at: string;
};
export type CompensationType = {
  id: number;
  name: string;
  is_hourly?: boolean;
  is_monthly?: boolean;
  is_milestone?: boolean;
  created_at: string;
  updated_at: string;
};
export type Currency = {
  id: number;
  code: string;
  symbol: string;
  created_at: string;
  updated_at: string;
};
export type Degree = {
  employee: number;
  program: number;
  institute: number;
  year: string;
};
export type Department = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
export type DocumentType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
export type EmployeementType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
export type EmployeeList = {
  id: number;
  org_id: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  date_of_joining: string;
  image: string;
};
export type EmployeeUser = {
  first_name?: string;
  last_name?: string;
  email: string;
  image?: string | null;
  contact_number: string;
};
export type Experirence = {
  employee: number;
  title: string;
  company: number;
  start_date: string;
  end_date: string;
};
export type Employee = {
  id: number;
  user: EmployeeUser;
  degrees: Degree[];
  experience: Experirence[];
  org_id: string;
  total_experience: string;
  nic: string;
  date_of_joining: string;
  emergency_contact_number: string;
  designation: string;
  user_allowed?: boolean;
  created_at: string;
  updated_at: string;
  department?: number | null;
  manager?: number | null;
  type?: number | null;
  benefits?: number[];
};
export type EmployeeUpdate = {
  department?: number | null;
  designation: string;
  manager?: number | null;
  benefits?: number[];
  type?: number | null;
  user_allowed?: boolean;
};
export type PatchedEmployeeUpdate = {
  department?: number | null;
  designation?: string;
  manager?: number | null;
  benefits?: number[];
  type?: number | null;
  user_allowed?: boolean;
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
export type Institue = {
  id: number;
  name: string;
  image?: string | null;
  created_at: string;
  updated_at: string;
};
export type Me = {
  first_name?: string;
  last_name?: string;
  email: string;
  organization?: string;
  image?: string | null;
  is_superuser?: boolean;
  headline: string;
  contact_number: string;
};
export type Program = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
export const {
  useApiBenefitsListQuery,
  useApiBenefitsCreateMutation,
  useApiChangePasswordPartialUpdateMutation,
  useApiCompaniesListQuery,
  useApiCompaniesCreateMutation,
  useApiCompensationScheduleListQuery,
  useApiCompensationScheduleCreateMutation,
  useApiCompensationTypeListQuery,
  useApiCompensationTypeCreateMutation,
  useApiCurrencyListQuery,
  useApiCurrencyCreateMutation,
  useApiDegreesListQuery,
  useApiDegreesCreateMutation,
  useApiDepartmentListQuery,
  useApiDepartmentCreateMutation,
  useApiDocumentTypeListQuery,
  useApiDocumentTypeCreateMutation,
  useApiEmployeementTypeListQuery,
  useApiEmployeementTypeCreateMutation,
  useApiEmployeesListQuery,
  useApiEmployeesCreateMutation,
  useApiEmployeesRetrieveQuery,
  useApiEmployeesPartialUpdateMutation,
  useApiEmployeesDestroyMutation,
  useApiEmployeesCompensationRetrieveQuery,
  useApiEmployeesCompensationCreateMutation,
  useApiEmployeesDocumentsListQuery,
  useApiEmployeesDocumentsCreateMutation,
  useApiExperiencesListQuery,
  useApiExperiencesCreateMutation,
  useApiInstituesListQuery,
  useApiInstituesCreateMutation,
  useApiMeRetrieveQuery,
  useApiProgramsListQuery,
  useApiProgramsCreateMutation,
} = injectedRtkApi;
