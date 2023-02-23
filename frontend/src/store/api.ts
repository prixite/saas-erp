import { rtk } from "@src/store/reducers/generated";

const enhancedRtkApi = rtk.enhanceEndpoints({
  addTagTypes: [
    "Module",
    "UserModule",
    "OrganizationModule",
    "User",
    "Comapany",
    "EmploymentType",
    "Department",
    "Program",
    "Institute",
    "Currency",
  ],
  endpoints: {
    apiUsersAccessList: {
      providesTags: ["UserModule"],
    },
    apiUsersAccessRetrieve: {
      providesTags: ["UserModule"],
    },
    apiUsersAccessCreate: {
      invalidatesTags: ["UserModule"],
    },
    apiUsersAccessUpdate: {
      invalidatesTags: ["UserModule"],
    },
    apiUsersAccessDestroy: {
      invalidatesTags: ["UserModule"],
    },
    apiModuleList: {
      providesTags: ["Module"],
    },
    apiModuleRetrieve: {
      providesTags: ["Module"],
    },
    apiModuleCreate: {
      invalidatesTags: ["Module"],
    },
    apiModuleUpdate: {
      invalidatesTags: ["Module"],
    },
    apiModuleDestroy: {
      invalidatesTags: ["Module"],
    },
    apiOrganizationModuleList: {
      providesTags: ["OrganizationModule"],
    },
    apiOrganizationModuleRetrieve: {
      providesTags: ["OrganizationModule"],
    },
    apiOrganizationModuleCreate: {
      invalidatesTags: ["OrganizationModule"],
    },
    apiOrganizationModuleUpdate: {
      invalidatesTags: ["OrganizationModule"],
    },
    apiOrganizationModuleDestroy: {
      invalidatesTags: ["OrganizationModule"],
    },
    apiUsersList: {
      providesTags: ["User"],
    },
    apiUsersRetrieve: {
      providesTags: ["User"],
    },
    apiUsersCreate: {
      invalidatesTags: ["User"],
    },
    apiUsersUpdate: {
      invalidatesTags: ["User"],
    },
    apiUsersDestroy: {
      invalidatesTags: ["User"],
    },
    apiCompaniesList: {
      providesTags: ["Comapany"],
    },
    apiCompaniesRetrieve: {
      providesTags: ["Comapany"],
    },
    apiCompaniesCreate: {
      invalidatesTags: ["Comapany"],
    },
    apiCompaniesUpdate: {
      invalidatesTags: ["Comapany"],
    },
    apiCompaniesDestroy: {
      invalidatesTags: ["Comapany"],
    },
    apiEmployeementTypeList: {
      providesTags: ["EmploymentType"],
    },
    apiEmployeementTypeRetrieve: {
      providesTags: ["EmploymentType"],
    },
    apiEmployeementTypeCreate: {
      invalidatesTags: ["EmploymentType"],
    },
    apiEmployeementTypeUpdate: {
      invalidatesTags: ["EmploymentType"],
    },
    apiEmployeementTypeDestroy: {
      invalidatesTags: ["EmploymentType"],
    },
    apiDepartmentList: {
      providesTags: ["Department"],
    },
    apiDepartmentRetrieve: {
      providesTags: ["Department"],
    },
    apiDepartmentCreate: {
      invalidatesTags: ["Department"],
    },
    apiDepartmentUpdate: {
      invalidatesTags: ["Department"],
    },
    apiDepartmentDestroy: {
      invalidatesTags: ["Department"],
    },
    apiProgramsList: {
      providesTags: ["Program"],
    },
    apiProgramsRetrieve: {
      providesTags: ["Program"],
    },
    apiProgramsCreate: {
      invalidatesTags: ["Program"],
    },
    apiProgramsUpdate: {
      invalidatesTags: ["Program"],
    },
    apiProgramsDestroy: {
      invalidatesTags: ["Program"],
    },
    apiInstituesList: {
      providesTags: ["Institute"],
    },
    apiInstituesRetrieve: {
      providesTags: ["Institute"],
    },
    apiInstituesCreate: {
      invalidatesTags: ["Institute"],
    },
    apiInstituesUpdate: {
      invalidatesTags: ["Institute"],
    },
    apiInstituesDestroy: {
      invalidatesTags: ["Institute"],
    },
    apiCurrencyList: {
      providesTags: ["Currency"],
    },
    apiCurrencyRetrieve: {
      providesTags: ["Currency"],
    },
    apiCurrencyCreate: {
      invalidatesTags: ["Currency"],
    },
    apiCurrencyUpdate: {
      invalidatesTags: ["Currency"],
    },
    apiCurrencyDestroy: {
      invalidatesTags: ["Currency"],
    },
  },
});

export * from "@src/store/reducers/generated";
export { enhancedRtkApi as api };
