import { rtk } from "@src/store/reducers/generated";

const enhancedRtkApi = rtk.enhanceEndpoints({
  addTagTypes: ["Module", "OrganizationModule"],
  endpoints: {
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
