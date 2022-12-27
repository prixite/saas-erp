import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers) => {
      headers.append("Content-Type", "application/json");
      headers.set("X-CSRFToken", document.forms.csrf.csrfmiddlewaretoken.value);
      localStorage.getItem("token") &&
        headers.set("Authorization", `Token ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
