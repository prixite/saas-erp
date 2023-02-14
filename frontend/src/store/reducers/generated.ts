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
    apiAssetTypeRetrieve: build.query<
      ApiAssetTypeRetrieveApiResponse,
      ApiAssetTypeRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/asset_type/${queryArg.id}/` }),
    }),
    apiAssetTypeUpdate: build.mutation<
      ApiAssetTypeUpdateApiResponse,
      ApiAssetTypeUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/asset_type/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.assetType,
      }),
    }),
    apiAssetTypeDestroy: build.mutation<
      ApiAssetTypeDestroyApiResponse,
      ApiAssetTypeDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/asset_type/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    apiAttendanceList: build.query<
      ApiAttendanceListApiResponse,
      ApiAttendanceListApiArg
    >({
      query: () => ({ url: `/api/attendance/` }),
    }),
    apiAwsRetrieve: build.query<
      ApiAwsRetrieveApiResponse,
      ApiAwsRetrieveApiArg
    >({
      query: () => ({ url: `/api/aws/` }),
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
    apiBenefitsRetrieve: build.query<
      ApiBenefitsRetrieveApiResponse,
      ApiBenefitsRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/benefits/${queryArg.id}/` }),
    }),
    apiBenefitsUpdate: build.mutation<
      ApiBenefitsUpdateApiResponse,
      ApiBenefitsUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/benefits/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.benefit,
      }),
    }),
    apiBenefitsDestroy: build.mutation<
      ApiBenefitsDestroyApiResponse,
      ApiBenefitsDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/benefits/${queryArg.id}/`,
        method: "DELETE",
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
    apiCompaniesRetrieve: build.query<
      ApiCompaniesRetrieveApiResponse,
      ApiCompaniesRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/companies/${queryArg.id}/` }),
    }),
    apiCompaniesUpdate: build.mutation<
      ApiCompaniesUpdateApiResponse,
      ApiCompaniesUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/companies/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.company,
      }),
    }),
    apiCompaniesDestroy: build.mutation<
      ApiCompaniesDestroyApiResponse,
      ApiCompaniesDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/companies/${queryArg.id}/`,
        method: "DELETE",
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
    apiCompensationScheduleRetrieve: build.query<
      ApiCompensationScheduleRetrieveApiResponse,
      ApiCompensationScheduleRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/compensation_schedule/${queryArg.id}/`,
      }),
    }),
    apiCompensationScheduleUpdate: build.mutation<
      ApiCompensationScheduleUpdateApiResponse,
      ApiCompensationScheduleUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/compensation_schedule/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.compensationSchedule,
      }),
    }),
    apiCompensationScheduleDestroy: build.mutation<
      ApiCompensationScheduleDestroyApiResponse,
      ApiCompensationScheduleDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/compensation_schedule/${queryArg.id}/`,
        method: "DELETE",
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
    apiCompensationTypeRetrieve: build.query<
      ApiCompensationTypeRetrieveApiResponse,
      ApiCompensationTypeRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/compensation_type/${queryArg.id}/` }),
    }),
    apiCompensationTypeUpdate: build.mutation<
      ApiCompensationTypeUpdateApiResponse,
      ApiCompensationTypeUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/compensation_type/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.compensationType,
      }),
    }),
    apiCompensationTypeDestroy: build.mutation<
      ApiCompensationTypeDestroyApiResponse,
      ApiCompensationTypeDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/compensation_type/${queryArg.id}/`,
        method: "DELETE",
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
    apiCurrencyRetrieve: build.query<
      ApiCurrencyRetrieveApiResponse,
      ApiCurrencyRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/currency/${queryArg.id}/` }),
    }),
    apiCurrencyUpdate: build.mutation<
      ApiCurrencyUpdateApiResponse,
      ApiCurrencyUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/currency/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.currency,
      }),
    }),
    apiCurrencyDestroy: build.mutation<
      ApiCurrencyDestroyApiResponse,
      ApiCurrencyDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/currency/${queryArg.id}/`,
        method: "DELETE",
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
    apiDepartmentRetrieve: build.query<
      ApiDepartmentRetrieveApiResponse,
      ApiDepartmentRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/department/${queryArg.id}/` }),
    }),
    apiDepartmentUpdate: build.mutation<
      ApiDepartmentUpdateApiResponse,
      ApiDepartmentUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/department/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.department,
      }),
    }),
    apiDepartmentDestroy: build.mutation<
      ApiDepartmentDestroyApiResponse,
      ApiDepartmentDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/department/${queryArg.id}/`,
        method: "DELETE",
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
    apiDocumentTypeRetrieve: build.query<
      ApiDocumentTypeRetrieveApiResponse,
      ApiDocumentTypeRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/document_type/${queryArg.id}/` }),
    }),
    apiDocumentTypeUpdate: build.mutation<
      ApiDocumentTypeUpdateApiResponse,
      ApiDocumentTypeUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/document_type/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.documentType,
      }),
    }),
    apiDocumentTypeDestroy: build.mutation<
      ApiDocumentTypeDestroyApiResponse,
      ApiDocumentTypeDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/document_type/${queryArg.id}/`,
        method: "DELETE",
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
    apiEmployeementTypeRetrieve: build.query<
      ApiEmployeementTypeRetrieveApiResponse,
      ApiEmployeementTypeRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/employeement_type/${queryArg.id}/` }),
    }),
    apiEmployeementTypeUpdate: build.mutation<
      ApiEmployeementTypeUpdateApiResponse,
      ApiEmployeementTypeUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/employeement_type/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.employeementType,
      }),
    }),
    apiEmployeementTypeDestroy: build.mutation<
      ApiEmployeementTypeDestroyApiResponse,
      ApiEmployeementTypeDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/employeement_type/${queryArg.id}/`,
        method: "DELETE",
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
    apiInstituesRetrieve: build.query<
      ApiInstituesRetrieveApiResponse,
      ApiInstituesRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/institues/${queryArg.id}/` }),
    }),
    apiInstituesUpdate: build.mutation<
      ApiInstituesUpdateApiResponse,
      ApiInstituesUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/institues/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.institue,
      }),
    }),
    apiInstituesDestroy: build.mutation<
      ApiInstituesDestroyApiResponse,
      ApiInstituesDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/institues/${queryArg.id}/`,
        method: "DELETE",
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
    apiMeNotificationUpdateUpdate: build.mutation<
      ApiMeNotificationUpdateUpdateApiResponse,
      ApiMeNotificationUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/me-notification/update/`,
        method: "PUT",
        body: queryArg.meUpdateNotification,
      }),
    }),
    apiMeUpdateUpdate: build.mutation<
      ApiMeUpdateUpdateApiResponse,
      ApiMeUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/me/update/`,
        method: "PUT",
        body: queryArg.meUpdate,
      }),
    }),
    apiModuleList: build.query<ApiModuleListApiResponse, ApiModuleListApiArg>({
      query: () => ({ url: `/api/module/` }),
    }),
    apiModuleCreate: build.mutation<
      ApiModuleCreateApiResponse,
      ApiModuleCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/module/`,
        method: "POST",
        body: queryArg.module,
      }),
    }),
    apiModuleRetrieve: build.query<
      ApiModuleRetrieveApiResponse,
      ApiModuleRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/module/${queryArg.id}/` }),
    }),
    apiModuleUpdate: build.mutation<
      ApiModuleUpdateApiResponse,
      ApiModuleUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/module/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.module,
      }),
    }),
    apiModuleDestroy: build.mutation<
      ApiModuleDestroyApiResponse,
      ApiModuleDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/module/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    apiOrganizationList: build.query<
      ApiOrganizationListApiResponse,
      ApiOrganizationListApiArg
    >({
      query: () => ({ url: `/api/organization/` }),
    }),
    apiOrganizationCreate: build.mutation<
      ApiOrganizationCreateApiResponse,
      ApiOrganizationCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/organization/`,
        method: "POST",
        body: queryArg.organization,
      }),
    }),
    apiOrganizationModuleList: build.query<
      ApiOrganizationModuleListApiResponse,
      ApiOrganizationModuleListApiArg
    >({
      query: () => ({ url: `/api/organization-module/` }),
    }),
    apiOrganizationModuleCreate: build.mutation<
      ApiOrganizationModuleCreateApiResponse,
      ApiOrganizationModuleCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/organization-module/`,
        method: "POST",
        body: queryArg.organizationModule,
      }),
    }),
    apiOrganizationModuleRetrieve: build.query<
      ApiOrganizationModuleRetrieveApiResponse,
      ApiOrganizationModuleRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/organization-module/${queryArg.id}/`,
      }),
    }),
    apiOrganizationModuleUpdate: build.mutation<
      ApiOrganizationModuleUpdateApiResponse,
      ApiOrganizationModuleUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/organization-module/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.organizationModule,
      }),
    }),
    apiOrganizationModuleDestroy: build.mutation<
      ApiOrganizationModuleDestroyApiResponse,
      ApiOrganizationModuleDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/organization-module/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    apiOrganizationRetrieve: build.query<
      ApiOrganizationRetrieveApiResponse,
      ApiOrganizationRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/organization/${queryArg.id}/` }),
    }),
    apiOrganizationUpdate: build.mutation<
      ApiOrganizationUpdateApiResponse,
      ApiOrganizationUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/organization/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.organization,
      }),
    }),
    apiOrganizationDestroy: build.mutation<
      ApiOrganizationDestroyApiResponse,
      ApiOrganizationDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/organization/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    apiOrganizationModulesList: build.query<
      ApiOrganizationModulesListApiResponse,
      ApiOrganizationModulesListApiArg
    >({
      query: () => ({ url: `/api/organization_modules/` }),
    }),
    apiOwnerOnboardCreate: build.mutation<
      ApiOwnerOnboardCreateApiResponse,
      ApiOwnerOnboardCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/owner/onboard/`,
        method: "POST",
        body: queryArg.ownerOnBoarding,
      }),
    }),
    apiPasswordResetCreate: build.mutation<
      ApiPasswordResetCreateApiResponse,
      ApiPasswordResetCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/password-reset/`,
        method: "POST",
        body: queryArg.resendEmailCode,
      }),
    }),
    apiPasswordResetCompleteCreate: build.mutation<
      ApiPasswordResetCompleteCreateApiResponse,
      ApiPasswordResetCompleteCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/password-reset-complete/`,
        method: "POST",
        body: queryArg.passwordResetComplete,
      }),
    }),
    apiPasswordResetConfirmCreate: build.mutation<
      ApiPasswordResetConfirmCreateApiResponse,
      ApiPasswordResetConfirmCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/password-reset-confirm/`,
        method: "POST",
        body: queryArg.passwordResetConfirm,
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
    apiProgramsRetrieve: build.query<
      ApiProgramsRetrieveApiResponse,
      ApiProgramsRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/programs/${queryArg.id}/` }),
    }),
    apiProgramsUpdate: build.mutation<
      ApiProgramsUpdateApiResponse,
      ApiProgramsUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/programs/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.program,
      }),
    }),
    apiProgramsDestroy: build.mutation<
      ApiProgramsDestroyApiResponse,
      ApiProgramsDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/programs/${queryArg.id}/`,
        method: "DELETE",
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
    apiStandupList: build.query<
      ApiStandupListApiResponse,
      ApiStandupListApiArg
    >({
      query: () => ({ url: `/api/standup/` }),
    }),
    apiStandupCreate: build.mutation<
      ApiStandupCreateApiResponse,
      ApiStandupCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/standup/`,
        method: "POST",
        body: queryArg.standup,
      }),
    }),
    apiStandupRetrieve: build.query<
      ApiStandupRetrieveApiResponse,
      ApiStandupRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/standup/${queryArg.id}/` }),
    }),
    apiStandupUpdate: build.mutation<
      ApiStandupUpdateApiResponse,
      ApiStandupUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/standup/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.standup,
      }),
    }),
    apiStandupDestroy: build.mutation<
      ApiStandupDestroyApiResponse,
      ApiStandupDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/standup/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    apiStandupMembersRetrieve: build.query<
      ApiStandupMembersRetrieveApiResponse,
      ApiStandupMembersRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/standup/${queryArg.id}/members/` }),
    }),
    apiStandupUpdateList: build.query<
      ApiStandupUpdateListApiResponse,
      ApiStandupUpdateListApiArg
    >({
      query: () => ({ url: `/api/standup_update/` }),
    }),
    apiStandupUpdateCreate: build.mutation<
      ApiStandupUpdateCreateApiResponse,
      ApiStandupUpdateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/standup_update/`,
        method: "POST",
        body: queryArg.standupUpdate,
      }),
    }),
    apiStandupUpdateRetrieve: build.query<
      ApiStandupUpdateRetrieveApiResponse,
      ApiStandupUpdateRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/standup_update/${queryArg.id}/` }),
    }),
    apiStandupUpdateUpdate: build.mutation<
      ApiStandupUpdateUpdateApiResponse,
      ApiStandupUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/standup_update/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.standupUpdate,
      }),
    }),
    apiStandupUpdateDestroy: build.mutation<
      ApiStandupUpdateDestroyApiResponse,
      ApiStandupUpdateDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/standup_update/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    apiTeamList: build.query<ApiTeamListApiResponse, ApiTeamListApiArg>({
      query: () => ({ url: `/api/team/` }),
    }),
    apiTeamCreate: build.mutation<
      ApiTeamCreateApiResponse,
      ApiTeamCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/team/`,
        method: "POST",
        body: queryArg.team,
      }),
    }),
    apiTeamRetrieve: build.query<
      ApiTeamRetrieveApiResponse,
      ApiTeamRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/team/${queryArg.id}/` }),
    }),
    apiTeamUpdate: build.mutation<
      ApiTeamUpdateApiResponse,
      ApiTeamUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/team/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.team,
      }),
    }),
    apiTeamDestroy: build.mutation<
      ApiTeamDestroyApiResponse,
      ApiTeamDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/team/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    apiUsersList: build.query<ApiUsersListApiResponse, ApiUsersListApiArg>({
      query: () => ({ url: `/api/users/` }),
    }),
    apiUsersCreate: build.mutation<
      ApiUsersCreateApiResponse,
      ApiUsersCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users/`,
        method: "POST",
        body: queryArg.user,
      }),
    }),
    apiUsersRetrieve: build.query<
      ApiUsersRetrieveApiResponse,
      ApiUsersRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/users/${queryArg.id}/` }),
    }),
    apiUsersUpdate: build.mutation<
      ApiUsersUpdateApiResponse,
      ApiUsersUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.user,
      }),
    }),
    apiUsersDestroy: build.mutation<
      ApiUsersDestroyApiResponse,
      ApiUsersDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users/${queryArg.id}/`,
        method: "DELETE",
      }),
    }),
    apiUsersAccessList: build.query<
      ApiUsersAccessListApiResponse,
      ApiUsersAccessListApiArg
    >({
      query: (queryArg) => ({ url: `/api/users/${queryArg.id}/access/` }),
    }),
    apiUsersAccessCreate: build.mutation<
      ApiUsersAccessCreateApiResponse,
      ApiUsersAccessCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users/${queryArg.id}/access/`,
        method: "POST",
        body: queryArg.userModuleRole,
      }),
    }),
    apiUsersAccessRetrieve: build.query<
      ApiUsersAccessRetrieveApiResponse,
      ApiUsersAccessRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/users/access/${queryArg.id}/` }),
    }),
    apiUsersAccessUpdate: build.mutation<
      ApiUsersAccessUpdateApiResponse,
      ApiUsersAccessUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users/access/${queryArg.id}/`,
        method: "PUT",
        body: queryArg.userModuleRole,
      }),
    }),
    apiUsersAccessDestroy: build.mutation<
      ApiUsersAccessDestroyApiResponse,
      ApiUsersAccessDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users/access/${queryArg.id}/`,
        method: "DELETE",
      }),
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
export type ApiAssetTypeRetrieveApiResponse = /** status 200  */ AssetType;
export type ApiAssetTypeRetrieveApiArg = {
  id: number;
};
export type ApiAssetTypeUpdateApiResponse = /** status 200  */ AssetType;
export type ApiAssetTypeUpdateApiArg = {
  id: number;
  assetType: AssetType;
};
export type ApiAssetTypeDestroyApiResponse = unknown;
export type ApiAssetTypeDestroyApiArg = {
  id: number;
};
export type ApiAttendanceListApiResponse = /** status 200  */ Attendance[];
export type ApiAttendanceListApiArg = void;
export type ApiAwsRetrieveApiResponse = unknown;
export type ApiAwsRetrieveApiArg = void;
export type ApiBenefitsListApiResponse = /** status 200  */ Benefit[];
export type ApiBenefitsListApiArg = void;
export type ApiBenefitsCreateApiResponse = /** status 201  */ Benefit;
export type ApiBenefitsCreateApiArg = {
  benefit: Benefit;
};
export type ApiBenefitsRetrieveApiResponse = /** status 200  */ Benefit;
export type ApiBenefitsRetrieveApiArg = {
  id: number;
};
export type ApiBenefitsUpdateApiResponse = /** status 200  */ Benefit;
export type ApiBenefitsUpdateApiArg = {
  id: number;
  benefit: Benefit;
};
export type ApiBenefitsDestroyApiResponse = unknown;
export type ApiBenefitsDestroyApiArg = {
  id: number;
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
export type ApiCompaniesRetrieveApiResponse = /** status 200  */ Company;
export type ApiCompaniesRetrieveApiArg = {
  id: number;
};
export type ApiCompaniesUpdateApiResponse = /** status 200  */ Company;
export type ApiCompaniesUpdateApiArg = {
  id: number;
  company: Company;
};
export type ApiCompaniesDestroyApiResponse = unknown;
export type ApiCompaniesDestroyApiArg = {
  id: number;
};
export type ApiCompensationScheduleListApiResponse =
  /** status 200  */ CompensationSchedule[];
export type ApiCompensationScheduleListApiArg = void;
export type ApiCompensationScheduleCreateApiResponse =
  /** status 201  */ CompensationSchedule;
export type ApiCompensationScheduleCreateApiArg = {
  compensationSchedule: CompensationSchedule;
};
export type ApiCompensationScheduleRetrieveApiResponse =
  /** status 200  */ CompensationSchedule;
export type ApiCompensationScheduleRetrieveApiArg = {
  id: number;
};
export type ApiCompensationScheduleUpdateApiResponse =
  /** status 200  */ CompensationSchedule;
export type ApiCompensationScheduleUpdateApiArg = {
  id: number;
  compensationSchedule: CompensationSchedule;
};
export type ApiCompensationScheduleDestroyApiResponse = unknown;
export type ApiCompensationScheduleDestroyApiArg = {
  id: number;
};
export type ApiCompensationTypeListApiResponse =
  /** status 200  */ CompensationType[];
export type ApiCompensationTypeListApiArg = void;
export type ApiCompensationTypeCreateApiResponse =
  /** status 201  */ CompensationType;
export type ApiCompensationTypeCreateApiArg = {
  compensationType: CompensationType;
};
export type ApiCompensationTypeRetrieveApiResponse =
  /** status 200  */ CompensationType;
export type ApiCompensationTypeRetrieveApiArg = {
  id: number;
};
export type ApiCompensationTypeUpdateApiResponse =
  /** status 200  */ CompensationType;
export type ApiCompensationTypeUpdateApiArg = {
  id: number;
  compensationType: CompensationType;
};
export type ApiCompensationTypeDestroyApiResponse = unknown;
export type ApiCompensationTypeDestroyApiArg = {
  id: number;
};
export type ApiCurrencyListApiResponse = /** status 200  */ Currency[];
export type ApiCurrencyListApiArg = void;
export type ApiCurrencyCreateApiResponse = /** status 201  */ Currency;
export type ApiCurrencyCreateApiArg = {
  currency: Currency;
};
export type ApiCurrencyRetrieveApiResponse = /** status 200  */ Currency;
export type ApiCurrencyRetrieveApiArg = {
  id: number;
};
export type ApiCurrencyUpdateApiResponse = /** status 200  */ Currency;
export type ApiCurrencyUpdateApiArg = {
  id: number;
  currency: Currency;
};
export type ApiCurrencyDestroyApiResponse = unknown;
export type ApiCurrencyDestroyApiArg = {
  id: number;
};
export type ApiDepartmentListApiResponse = /** status 200  */ Department[];
export type ApiDepartmentListApiArg = void;
export type ApiDepartmentCreateApiResponse = /** status 201  */ Department;
export type ApiDepartmentCreateApiArg = {
  department: Department;
};
export type ApiDepartmentRetrieveApiResponse = /** status 200  */ Department;
export type ApiDepartmentRetrieveApiArg = {
  id: number;
};
export type ApiDepartmentUpdateApiResponse = /** status 200  */ Department;
export type ApiDepartmentUpdateApiArg = {
  id: number;
  department: Department;
};
export type ApiDepartmentDestroyApiResponse = unknown;
export type ApiDepartmentDestroyApiArg = {
  id: number;
};
export type ApiDocumentTypeListApiResponse = /** status 200  */ DocumentType[];
export type ApiDocumentTypeListApiArg = void;
export type ApiDocumentTypeCreateApiResponse = /** status 201  */ DocumentType;
export type ApiDocumentTypeCreateApiArg = {
  documentType: DocumentType;
};
export type ApiDocumentTypeRetrieveApiResponse =
  /** status 200  */ DocumentType;
export type ApiDocumentTypeRetrieveApiArg = {
  id: number;
};
export type ApiDocumentTypeUpdateApiResponse = /** status 200  */ DocumentType;
export type ApiDocumentTypeUpdateApiArg = {
  id: number;
  documentType: DocumentType;
};
export type ApiDocumentTypeDestroyApiResponse = unknown;
export type ApiDocumentTypeDestroyApiArg = {
  id: number;
};
export type ApiEmployeementTypeListApiResponse =
  /** status 200  */ EmployeementType[];
export type ApiEmployeementTypeListApiArg = void;
export type ApiEmployeementTypeCreateApiResponse =
  /** status 201  */ EmployeementType;
export type ApiEmployeementTypeCreateApiArg = {
  employeementType: EmployeementType;
};
export type ApiEmployeementTypeRetrieveApiResponse =
  /** status 200  */ EmployeementType;
export type ApiEmployeementTypeRetrieveApiArg = {
  id: number;
};
export type ApiEmployeementTypeUpdateApiResponse =
  /** status 200  */ EmployeementType;
export type ApiEmployeementTypeUpdateApiArg = {
  id: number;
  employeementType: EmployeementType;
};
export type ApiEmployeementTypeDestroyApiResponse = unknown;
export type ApiEmployeementTypeDestroyApiArg = {
  id: number;
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
export type ApiInstituesRetrieveApiResponse = /** status 200  */ Institue;
export type ApiInstituesRetrieveApiArg = {
  id: number;
};
export type ApiInstituesUpdateApiResponse = /** status 200  */ Institue;
export type ApiInstituesUpdateApiArg = {
  id: number;
  institue: Institue;
};
export type ApiInstituesDestroyApiResponse = unknown;
export type ApiInstituesDestroyApiArg = {
  id: number;
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
export type ApiMeNotificationUpdateUpdateApiResponse =
  /** status 200  */ MeUpdateNotification;
export type ApiMeNotificationUpdateUpdateApiArg = {
  meUpdateNotification: MeUpdateNotification;
};
export type ApiMeUpdateUpdateApiResponse = /** status 200  */ MeUpdate;
export type ApiMeUpdateUpdateApiArg = {
  meUpdate: MeUpdate;
};
export type ApiModuleListApiResponse = /** status 200  */ Module[];
export type ApiModuleListApiArg = void;
export type ApiModuleCreateApiResponse = /** status 201  */ Module;
export type ApiModuleCreateApiArg = {
  module: Module;
};
export type ApiModuleRetrieveApiResponse = /** status 200  */ Module;
export type ApiModuleRetrieveApiArg = {
  id: number;
};
export type ApiModuleUpdateApiResponse = /** status 200  */ Module;
export type ApiModuleUpdateApiArg = {
  id: number;
  module: Module;
};
export type ApiModuleDestroyApiResponse = unknown;
export type ApiModuleDestroyApiArg = {
  id: number;
};
export type ApiOrganizationListApiResponse = /** status 200  */ Organization[];
export type ApiOrganizationListApiArg = void;
export type ApiOrganizationCreateApiResponse = /** status 201  */ Organization;
export type ApiOrganizationCreateApiArg = {
  organization: Organization;
};
export type ApiOrganizationModuleListApiResponse =
  /** status 200  */ OrganizationModule[];
export type ApiOrganizationModuleListApiArg = void;
export type ApiOrganizationModuleCreateApiResponse =
  /** status 201  */ OrganizationModule;
export type ApiOrganizationModuleCreateApiArg = {
  organizationModule: OrganizationModule;
};
export type ApiOrganizationModuleRetrieveApiResponse =
  /** status 200  */ OrganizationModule;
export type ApiOrganizationModuleRetrieveApiArg = {
  id: number;
};
export type ApiOrganizationModuleUpdateApiResponse =
  /** status 200  */ OrganizationModule;
export type ApiOrganizationModuleUpdateApiArg = {
  id: number;
  organizationModule: OrganizationModule;
};
export type ApiOrganizationModuleDestroyApiResponse = unknown;
export type ApiOrganizationModuleDestroyApiArg = {
  id: number;
};
export type ApiOrganizationRetrieveApiResponse =
  /** status 200  */ Organization;
export type ApiOrganizationRetrieveApiArg = {
  id: number;
};
export type ApiOrganizationUpdateApiResponse = /** status 200  */ Organization;
export type ApiOrganizationUpdateApiArg = {
  id: number;
  organization: Organization;
};
export type ApiOrganizationDestroyApiResponse = unknown;
export type ApiOrganizationDestroyApiArg = {
  id: number;
};
export type ApiOrganizationModulesListApiResponse = /** status 200  */ Module[];
export type ApiOrganizationModulesListApiArg = void;
export type ApiOwnerOnboardCreateApiResponse =
  /** status 201  */ OwnerOnBoarding;
export type ApiOwnerOnboardCreateApiArg = {
  ownerOnBoarding: OwnerOnBoarding;
};
export type ApiPasswordResetCreateApiResponse =
  /** status 200  */ ResendEmailCode;
export type ApiPasswordResetCreateApiArg = {
  resendEmailCode: ResendEmailCode;
};
export type ApiPasswordResetCompleteCreateApiResponse =
  /** status 200  */ PasswordResetComplete;
export type ApiPasswordResetCompleteCreateApiArg = {
  passwordResetComplete: PasswordResetComplete;
};
export type ApiPasswordResetConfirmCreateApiResponse =
  /** status 200  */ PasswordResetConfirm;
export type ApiPasswordResetConfirmCreateApiArg = {
  passwordResetConfirm: PasswordResetConfirm;
};
export type ApiProgramsListApiResponse = /** status 200  */ Program[];
export type ApiProgramsListApiArg = void;
export type ApiProgramsCreateApiResponse = /** status 201  */ Program;
export type ApiProgramsCreateApiArg = {
  program: Program;
};
export type ApiProgramsRetrieveApiResponse = /** status 200  */ Program;
export type ApiProgramsRetrieveApiArg = {
  id: number;
};
export type ApiProgramsUpdateApiResponse = /** status 200  */ Program;
export type ApiProgramsUpdateApiArg = {
  id: number;
  program: Program;
};
export type ApiProgramsDestroyApiResponse = unknown;
export type ApiProgramsDestroyApiArg = {
  id: number;
};
export type ApiRoleListApiResponse = /** status 200  */ Role[];
export type ApiRoleListApiArg = void;
export type ApiSlackAttendanceCreateApiResponse = unknown;
export type ApiSlackAttendanceCreateApiArg = void;
export type ApiStandupListApiResponse = /** status 200  */ Standup[];
export type ApiStandupListApiArg = void;
export type ApiStandupCreateApiResponse = /** status 201  */ Standup;
export type ApiStandupCreateApiArg = {
  standup: Standup;
};
export type ApiStandupRetrieveApiResponse = /** status 200  */ Standup;
export type ApiStandupRetrieveApiArg = {
  id: number;
};
export type ApiStandupUpdateApiResponse = /** status 200  */ Standup;
export type ApiStandupUpdateApiArg = {
  id: number;
  standup: Standup;
};
export type ApiStandupDestroyApiResponse = unknown;
export type ApiStandupDestroyApiArg = {
  id: number;
};
export type ApiStandupMembersRetrieveApiResponse = /** status 200  */ Standup;
export type ApiStandupMembersRetrieveApiArg = {
  id: number;
};
export type ApiStandupUpdateListApiResponse =
  /** status 200  */ StandupUpdate[];
export type ApiStandupUpdateListApiArg = void;
export type ApiStandupUpdateCreateApiResponse =
  /** status 201  */ StandupUpdate;
export type ApiStandupUpdateCreateApiArg = {
  standupUpdate: StandupUpdate;
};
export type ApiStandupUpdateRetrieveApiResponse =
  /** status 200  */ StandupUpdate;
export type ApiStandupUpdateRetrieveApiArg = {
  id: number;
};
export type ApiStandupUpdateUpdateApiResponse =
  /** status 200  */ StandupUpdate;
export type ApiStandupUpdateUpdateApiArg = {
  id: number;
  standupUpdate: StandupUpdate;
};
export type ApiStandupUpdateDestroyApiResponse = unknown;
export type ApiStandupUpdateDestroyApiArg = {
  id: number;
};
export type ApiTeamListApiResponse = /** status 200  */ Team[];
export type ApiTeamListApiArg = void;
export type ApiTeamCreateApiResponse = /** status 201  */ Team;
export type ApiTeamCreateApiArg = {
  team: Team;
};
export type ApiTeamRetrieveApiResponse = /** status 200  */ Team;
export type ApiTeamRetrieveApiArg = {
  id: number;
};
export type ApiTeamUpdateApiResponse = /** status 200  */ Team;
export type ApiTeamUpdateApiArg = {
  id: number;
  team: Team;
};
export type ApiTeamDestroyApiResponse = unknown;
export type ApiTeamDestroyApiArg = {
  id: number;
};
export type ApiUsersListApiResponse = /** status 200  */ User[];
export type ApiUsersListApiArg = void;
export type ApiUsersCreateApiResponse = /** status 201  */ User;
export type ApiUsersCreateApiArg = {
  user: User;
};
export type ApiUsersRetrieveApiResponse = /** status 200  */ User;
export type ApiUsersRetrieveApiArg = {
  id: number;
};
export type ApiUsersUpdateApiResponse = /** status 200  */ User;
export type ApiUsersUpdateApiArg = {
  id: number;
  user: User;
};
export type ApiUsersDestroyApiResponse = unknown;
export type ApiUsersDestroyApiArg = {
  id: number;
};
export type ApiUsersAccessListApiResponse = /** status 200  */ UserModuleRole[];
export type ApiUsersAccessListApiArg = {
  id: number;
};
export type ApiUsersAccessCreateApiResponse = /** status 201  */ UserModuleRole;
export type ApiUsersAccessCreateApiArg = {
  id: number;
  userModuleRole: UserModuleRole;
};
export type ApiUsersAccessRetrieveApiResponse =
  /** status 200  */ UserModuleRole;
export type ApiUsersAccessRetrieveApiArg = {
  id: number;
};
export type ApiUsersAccessUpdateApiResponse = /** status 200  */ UserModuleRole;
export type ApiUsersAccessUpdateApiArg = {
  id: number;
  userModuleRole: UserModuleRole;
};
export type ApiUsersAccessDestroyApiResponse = unknown;
export type ApiUsersAccessDestroyApiArg = {
  id: number;
};
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
  id: number;
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
  contact_number?: string | null;
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
  contact_number?: string | null;
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
  is_deleted?: boolean;
  deleted_at?: string | null;
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
export type LeaveTypeEnum = "sick leave" | "annual leave" | "casual leave";
export type BlankEnum = "";
export type NullEnum = null;
export type Status913Enum = "pending" | "approved" | "denied";
export type Leave = {
  id: number;
  leave_type?: (LeaveTypeEnum | BlankEnum | NullEnum) | null;
  leave_from: string;
  leave_to: string;
  description: string;
  hr_comment?: string | null;
  status?: Status913Enum;
  created_at: string;
  updated_at: string;
  employee: number;
  updated_by?: number | null;
  organization: number;
};
export type LeaveUpdate = {
  status?: Status913Enum;
  hr_comment?: string | null;
  leave_type?: (LeaveTypeEnum | BlankEnum | NullEnum) | null;
};
export type PatchedLeaveUpdate = {
  status?: Status913Enum;
  hr_comment?: string | null;
  leave_type?: (LeaveTypeEnum | BlankEnum | NullEnum) | null;
};
export type Login = {
  email: string;
  password: string;
};
export type Me = {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  organization?: string;
  image?: string;
  is_superuser?: boolean;
  headline?: string | null;
  contact_number?: string | null;
  allowed_modules: string;
  emp_id?: number;
};
export type MeUpdateNotification = {
  bill_update_email?: boolean;
  bill_update_phone?: boolean;
  new_team_member_email?: boolean;
  new_team_member_phone?: boolean;
  newsletters_email?: boolean;
  newsletters_phone?: boolean;
};
export type MeUpdate = {
  first_name?: string;
  last_name?: string;
  image?: string;
  contact_number?: string | null;
  headline?: string | null;
};
export type SlugEnum =
  | "payroll"
  | "user"
  | "employees"
  | "inventory"
  | "settings"
  | "leave"
  | "standup";
export type Module = {
  id: number;
  slug: SlugEnum;
  name: string;
  is_enabled?: boolean;
  created_at: string;
  updated_at: string;
};
export type Organization = {
  id: number;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
};
export type OrganizationModule = {
  id: number;
  is_enabled?: boolean;
  created_at: string;
  updated_at: string;
  module: number;
  organization: number;
};
export type OwnerEmployee = {
  date_of_joining: string;
  nic: string;
};
export type OwnerOnBoarding = {
  first_name?: string;
  last_name?: string;
  email: string;
  organization: Organization;
  employee?: OwnerEmployee;
};
export type ResendEmailCode = {
  email: string;
};
export type PasswordResetComplete = {
  uidb64: string;
  password: string;
  password2: string;
};
export type PasswordResetConfirm = {
  uidb64: string;
  token: string;
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
export type Standup = {
  id: number;
  name: string;
  time: string;
  created_at: string;
  updated_at: string;
  team: number;
};
export type StandupUpdateStatusEnum = "missed" | "joined" | "leave";
export type StandupUpdate = {
  id: number;
  time: string;
  date: string;
  status: StandupUpdateStatusEnum;
  work_done_yesterday?: string | null;
  work_to_do?: string | null;
  blockers?: string | null;
  created_at: string;
  updated_at: string;
  standup: number;
  employee: number;
};
export type Team = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  members: number[];
};
export type User = {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  image?: string;
  contact_number?: string | null;
  default_role?: number | null;
};
export type UserModuleRole = {
  id: number;
  module: number;
  role: number;
};
export const {
  useApiAssetTypeListQuery,
  useApiAssetTypeCreateMutation,
  useApiAssetTypeRetrieveQuery,
  useApiAssetTypeUpdateMutation,
  useApiAssetTypeDestroyMutation,
  useApiAttendanceListQuery,
  useApiAwsRetrieveQuery,
  useApiBenefitsListQuery,
  useApiBenefitsCreateMutation,
  useApiBenefitsRetrieveQuery,
  useApiBenefitsUpdateMutation,
  useApiBenefitsDestroyMutation,
  useApiChangePasswordPartialUpdateMutation,
  useApiCompaniesListQuery,
  useApiCompaniesCreateMutation,
  useApiCompaniesRetrieveQuery,
  useApiCompaniesUpdateMutation,
  useApiCompaniesDestroyMutation,
  useApiCompensationScheduleListQuery,
  useApiCompensationScheduleCreateMutation,
  useApiCompensationScheduleRetrieveQuery,
  useApiCompensationScheduleUpdateMutation,
  useApiCompensationScheduleDestroyMutation,
  useApiCompensationTypeListQuery,
  useApiCompensationTypeCreateMutation,
  useApiCompensationTypeRetrieveQuery,
  useApiCompensationTypeUpdateMutation,
  useApiCompensationTypeDestroyMutation,
  useApiCurrencyListQuery,
  useApiCurrencyCreateMutation,
  useApiCurrencyRetrieveQuery,
  useApiCurrencyUpdateMutation,
  useApiCurrencyDestroyMutation,
  useApiDepartmentListQuery,
  useApiDepartmentCreateMutation,
  useApiDepartmentRetrieveQuery,
  useApiDepartmentUpdateMutation,
  useApiDepartmentDestroyMutation,
  useApiDocumentTypeListQuery,
  useApiDocumentTypeCreateMutation,
  useApiDocumentTypeRetrieveQuery,
  useApiDocumentTypeUpdateMutation,
  useApiDocumentTypeDestroyMutation,
  useApiEmployeementTypeListQuery,
  useApiEmployeementTypeCreateMutation,
  useApiEmployeementTypeRetrieveQuery,
  useApiEmployeementTypeUpdateMutation,
  useApiEmployeementTypeDestroyMutation,
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
  useApiInstituesRetrieveQuery,
  useApiInstituesUpdateMutation,
  useApiInstituesDestroyMutation,
  useApiLeaveListQuery,
  useApiLeavePartialUpdateMutation,
  useApiLoginCreateMutation,
  useApiMeRetrieveQuery,
  useApiMeNotificationUpdateUpdateMutation,
  useApiMeUpdateUpdateMutation,
  useApiModuleListQuery,
  useApiModuleCreateMutation,
  useApiModuleRetrieveQuery,
  useApiModuleUpdateMutation,
  useApiModuleDestroyMutation,
  useApiOrganizationListQuery,
  useApiOrganizationCreateMutation,
  useApiOrganizationModuleListQuery,
  useApiOrganizationModuleCreateMutation,
  useApiOrganizationModuleRetrieveQuery,
  useApiOrganizationModuleUpdateMutation,
  useApiOrganizationModuleDestroyMutation,
  useApiOrganizationRetrieveQuery,
  useApiOrganizationUpdateMutation,
  useApiOrganizationDestroyMutation,
  useApiOrganizationModulesListQuery,
  useApiOwnerOnboardCreateMutation,
  useApiPasswordResetCreateMutation,
  useApiPasswordResetCompleteCreateMutation,
  useApiPasswordResetConfirmCreateMutation,
  useApiProgramsListQuery,
  useApiProgramsCreateMutation,
  useApiProgramsRetrieveQuery,
  useApiProgramsUpdateMutation,
  useApiProgramsDestroyMutation,
  useApiRoleListQuery,
  useApiSlackAttendanceCreateMutation,
  useApiStandupListQuery,
  useApiStandupCreateMutation,
  useApiStandupRetrieveQuery,
  useApiStandupUpdateMutation,
  useApiStandupDestroyMutation,
  useApiStandupMembersRetrieveQuery,
  useApiStandupUpdateListQuery,
  useApiStandupUpdateCreateMutation,
  useApiStandupUpdateRetrieveQuery,
  useApiStandupUpdateUpdateMutation,
  useApiStandupUpdateDestroyMutation,
  useApiTeamListQuery,
  useApiTeamCreateMutation,
  useApiTeamRetrieveQuery,
  useApiTeamUpdateMutation,
  useApiTeamDestroyMutation,
  useApiUsersListQuery,
  useApiUsersCreateMutation,
  useApiUsersRetrieveQuery,
  useApiUsersUpdateMutation,
  useApiUsersDestroyMutation,
  useApiUsersAccessListQuery,
  useApiUsersAccessCreateMutation,
  useApiUsersAccessRetrieveQuery,
  useApiUsersAccessUpdateMutation,
  useApiUsersAccessDestroyMutation,
} = injectedRtkApi;
