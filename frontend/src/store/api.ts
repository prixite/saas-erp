import { rtk } from "@src/store/reducers/generated";

const enhancedRtkApi = rtk.enhanceEndpoints({
  addTagTypes: ["UserModule"],
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
  },
});

export * from "@src/store/reducers/generated";
export { enhancedRtkApi as api };
