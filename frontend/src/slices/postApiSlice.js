import { apiSlice } from "./apiSlice";

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
        url: `/post`,
        method: "POST",
        body: formData,
      }),
    }),
    deletePost: builder.mutation({
      // Changed to builder.mutation
      query: (id) => ({
        // Assuming id is the post ID to delete
        url: `/post/${id}`,
        method: "DELETE", // Changed to uppercase "DELETE"
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useGetMePostsQuery,
  useDeletePostMutation, // Changed to useDeletePostMutation
} = postApiSlice;
