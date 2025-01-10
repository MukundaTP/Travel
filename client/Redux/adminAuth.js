import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? "https://school-web-wpxn.onrender.com/api/admin/" // Added 'admin/' to match local URL
        : "http://localhost:4000/api/admin/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users",
      providesTags: ["Users", "Reviews", "ContactQueries"], // Add this for cache invalidation
      transformResponse: (response) => {
        // Add a transform to handle the response structure
        return response;
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, isAdmin }) => ({
        url: `user/${id}`,
        method: "PATCH",
        credentials: "include",
        body: { isAdmin },
      }),
      invalidatesTags: ["Users"],
    }),
    getAllReviews: builder.query({
      query: () => "reviews",
      providesTags: ["Reviews"], // Add this for cache invalidation
      transformResponse: (response) => {
        return response;
      },
    }),
    updateReview: builder.mutation({
      query: ({ id, message }) => ({
        url: `review/${id}`,
        method: "PATCH",
        credentials: "include",
        body: { message },
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `review/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Reviews"],
    }),
    getAllContactQueries: builder.query({
      query: () => "contact-queries",
      providesTags: ["ContactQueries"], // Add this for cache invalidation
      transformResponse: (response) => {
        return response;
      },
    }),
    deleteContactQueries: builder.mutation({
      query: (id) => ({
        url: `contact-query/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ContactQueries"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useGetAllContactQueriesQuery,
  useDeleteContactQueriesMutation,
} = adminApi;
