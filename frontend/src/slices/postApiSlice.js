import { apiSlice } from "./apiSlice";
const BASE_URL = "http://localhost:8000/api";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: `${BASE_URL}/post`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPostsQuery } = postApiSlice;
