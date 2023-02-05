import { rtk } from "@src/store/reducers/generated";

const enhancedRtkApi = rtk.enhanceEndpoints({
  addTagTypes: ["Module", "UserModule", "OrganizationModule", "User"],
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
  },
});

export * from "@src/store/reducers/generated";
export { enhancedRtkApi as api };
