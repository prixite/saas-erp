import { rtk } from "@src/store/reducers/generated";

const enhancedRtkApi = rtk.enhanceEndpoints({
  addTagTypes: [],
  endpoints: {},
});

export * from "@src/store/reducers/generated";
export { enhancedRtkApi as api };
