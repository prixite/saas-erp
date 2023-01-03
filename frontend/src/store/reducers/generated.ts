import { emptySplitApi as api } from "@src/store/emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    apiAssetTypeList: build.query<
      ApiAssetTypeListApiResponse,
      ApiAssetTypeListApiArg
    >({
      query: () => ({ url: `/api/asset_type/` }),
    }),
    apiAssetTypeCreate: build.mutation<
      ApiAssetTypeCreateApiResponse,
      ApiAssetTypeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/asset_type/`,
        method: "POST",
        body: queryArg.assetType,
      }),
    }),
    apiAttendanceList: build.query<
      ApiAttendanceListApiResponse,
      ApiAttendanceListApiArg
    >({
      query: () => ({ url: `/api/attendance/` }),
    }),
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
    apiEmployeesUpdate: build.mutation<
      ApiEmployeesUpdateApiResponse,
      ApiEmployeesUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/employees/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.employeeUpdate,
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
    apiFlagsRetrieve: build.query<
      ApiFlagsRetrieveApiResponse,
      ApiFlagsRetrieveApiArg
    >({
      query: () => ({ url: `/api/flags/` }),
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
    apiLeaveList: build.query<ApiLeaveListApiResponse, ApiLeaveListApiArg>({
      query: () => ({ url: `/api/leave/` }),
    }),
    apiLeavePartialUpdate: build.mutation<
      ApiLeavePartialUpdateApiResponse,
      ApiLeavePartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/leave/${queryArg.id}/`,
        method: "PATCH",
        body: queryArg.patchedLeaveUpdate,
      }),
    }),
    apiLoginCreate: build.mutation<
      ApiLoginCreateApiResponse,
      ApiLoginCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/login/`,
        method: "POST",
        body: queryArg.login,
      }),
    }),
    apiMeRetrieve: build.query<ApiMeRetrieveApiResponse, ApiMeRetrieveApiArg>({
      query: () => ({ url: `/api/me/` }),
    }),
    apiMeUpdatePartialUpdate: build.mutation<
      ApiMeUpdatePartialUpdateApiResponse,
      ApiMeUpdatePartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/me/update/`,
        method: "PATCH",
        body: queryArg.patchedMeUpdate,
      }),
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
    apiRoleList: build.query<ApiRoleListApiResponse, ApiRoleListApiArg>({
      query: () => ({ url: `/api/role/` }),
    }),
    apiSlackAttendanceCreate: build.mutation<
      ApiSlackAttendanceCreateApiResponse,
      ApiSlackAttendanceCreateApiArg
    >({
      query: () => ({ url: `/api/slack/attendance/`, method: "POST" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as rtk };
export type ApiAssetTypeListApiResponse = /** status 200  */ AssetType[];
export type ApiAssetTypeListApiArg = void;
export type ApiAssetTypeCreateApiResponse = /** status 201  */ AssetType;
export type ApiAssetTypeCreateApiArg = {
  assetType: AssetType;
};
export type ApiAttendanceListApiResponse = /** status 200  */ Attendance[];
export type ApiAttendanceListApiArg = void;
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
export type ApiEmployeesUpdateApiResponse = /** status 200  */ EmployeeUpdate;
export type ApiEmployeesUpdateApiArg = {
  id: number;
  employeeUpdate: EmployeeUpdate;
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
export type ApiFlagsRetrieveApiResponse = unknown;
export type ApiFlagsRetrieveApiArg = void;
export type ApiInstituesListApiResponse = /** status 200  */ Institue[];
export type ApiInstituesListApiArg = void;
export type ApiInstituesCreateApiResponse = /** status 201  */ Institue;
export type ApiInstituesCreateApiArg = {
  institue: Institue;
};
export type ApiLeaveListApiResponse = /** status 200  */ Leave[];
export type ApiLeaveListApiArg = void;
export type ApiLeavePartialUpdateApiResponse = /** status 200  */ LeaveUpdate;
export type ApiLeavePartialUpdateApiArg = {
  id: number;
  patchedLeaveUpdate: PatchedLeaveUpdate;
};
export type ApiLoginCreateApiResponse = /** status 200  */ Login;
export type ApiLoginCreateApiArg = {
  login: Login;
};
export type ApiMeRetrieveApiResponse = /** status 200  */ Me;
export type ApiMeRetrieveApiArg = void;
export type ApiMeUpdatePartialUpdateApiResponse = /** status 200  */ MeUpdate;
export type ApiMeUpdatePartialUpdateApiArg = {
  patchedMeUpdate: PatchedMeUpdate;
};
export type ApiProgramsListApiResponse = /** status 200  */ Program[];
export type ApiProgramsListApiArg = void;
export type ApiProgramsCreateApiResponse = /** status 201  */ Program;
export type ApiProgramsCreateApiArg = {
  program: Program;
};
export type ApiRoleListApiResponse = /** status 200  */ Role[];
export type ApiRoleListApiArg = void;
export type ApiSlackAttendanceCreateApiResponse = unknown;
export type ApiSlackAttendanceCreateApiArg = void;
export type AssetType = {
  id: number;
  name: string;
  attributes: {
    [key: string]: any;
  };
  created_at: string;
  updated_at: string;
};
export type Attendance = {
  employee: number;
  time_in: string;
  time_out?: string | null;
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
  image?: string;
  contact_number: string;
  default_role?: number | null;
};
export type Degree = {
  program: number;
  institute: number;
  year: string;
};
export type Asset = {
  id: number;
  name: string;
  attribute_values: {
    [key: string]: any;
  };
  created_at: string;
  updated_at: string;
  type: number;
};
export type Experirence = {
  title: string;
  company: number;
  start_date: string;
  end_date: string;
};
export type Employee = {
  id: number;
  user: EmployeeUser;
  degrees: Degree[];
  assets: Asset[];
  experience: Experirence[];
  org_id: string;
  managing: number[];
  total_experience: string;
  nic: string;
  date_of_joining: string;
  emergency_contact_number: string;
  designation: string;
  salary?: number | null;
  leave_count?: number;
  user_allowed?: boolean;
  created_at: string;
  updated_at: string;
  department?: number | null;
  manager?: number | null;
  type?: number | null;
  benefits?: number[];
};
export type EmployeeUpdateUser = {
  first_name?: string;
  last_name?: string;
  email: string;
  image?: string;
  contact_number: string;
  default_role?: number | null;
};
export type EmployeeUpdate = {
  id: number;
  user: EmployeeUpdateUser;
  degrees: Degree[];
  assets: Asset[];
  experience: Experirence[];
  org_id: string;
  managing: number[];
  total_experience: string;
  emergency_contact_number: string;
  designation: string;
  salary?: number | null;
  leave_count?: number;
  user_allowed?: boolean;
  created_at: string;
  updated_at: string;
  department?: number | null;
  manager?: number | null;
  type?: number | null;
  benefits?: number[];
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
export type StatusEnum = "pending" | "approved" | "denied";
export type Leave = {
  id: number;
  leave_from: string;
  leave_to: string;
  description: string;
  hr_comment?: string | null;
  status?: StatusEnum;
  created_at: string;
  updated_at: string;
  employee: number;
  updated_by?: number | null;
  organization: number;
};
export type LeaveUpdate = {
  status?: StatusEnum;
};
export type PatchedLeaveUpdate = {
  status?: StatusEnum;
};
export type Login = {
  email: string;
  password: string;
};
export type Me = {
  first_name?: string;
  last_name?: string;
  email: string;
  organization?: string;
  image?: string;
  is_superuser?: boolean;
  headline: string;
  contact_number: string;
  allowed_modules: string;
};
export type MeUpdate = {
  first_name?: string;
  last_name?: string;
  image?: string;
  contact_number: string;
  headline: string;
};
export type PatchedMeUpdate = {
  first_name?: string;
  last_name?: string;
  image?: string;
  contact_number?: string;
  headline?: string;
};
export type Program = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
export type PermissionEnum = "c" | "b" | "a";
export type Role = {
  id: number;
  name: string;
  permission?: PermissionEnum;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
};
export const {
  useApiAssetTypeListQuery,
  useApiAssetTypeCreateMutation,
  useApiAttendanceListQuery,
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
  useApiDepartmentListQuery,
  useApiDepartmentCreateMutation,
  useApiDocumentTypeListQuery,
  useApiDocumentTypeCreateMutation,
  useApiEmployeementTypeListQuery,
  useApiEmployeementTypeCreateMutation,
  useApiEmployeesListQuery,
  useApiEmployeesCreateMutation,
  useApiEmployeesRetrieveQuery,
  useApiEmployeesUpdateMutation,
  useApiEmployeesDestroyMutation,
  useApiEmployeesCompensationRetrieveQuery,
  useApiEmployeesCompensationCreateMutation,
  useApiEmployeesDocumentsListQuery,
  useApiEmployeesDocumentsCreateMutation,
  useApiFlagsRetrieveQuery,
  useApiInstituesListQuery,
  useApiInstituesCreateMutation,
  useApiLeaveListQuery,
  useApiLeavePartialUpdateMutation,
  useApiLoginCreateMutation,
  useApiMeRetrieveQuery,
  useApiMeUpdatePartialUpdateMutation,
  useApiProgramsListQuery,
  useApiProgramsCreateMutation,
  useApiRoleListQuery,
  useApiSlackAttendanceCreateMutation,
} = injectedRtkApi;
