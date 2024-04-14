import { apiSlice } from "./apiSlice";

// const BASE_URL = "http://localhost:8000/api";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: `/post`,
        method: "GET",
      }),
    }),
    getMePosts: builder.query({
      query: () => ({
        url: `/post/me`,
        method: "GET",
      }),
    }),
    createPost: builder.mutation({
      query: (formData) => ({
        url: `/post`, // Corrected URL
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation, useGetMePostsQuery } =
  postApiSlice;
