import { rtk } from "@src/store/reducers/generated";

const enhancedRtkApi = rtk.enhanceEndpoints({
  addTagTypes: ["Module", "UserModule", "OrganizationModule"],
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
  },
});

export * from "@src/store/reducers/generated";
export { enhancedRtkApi as api };
