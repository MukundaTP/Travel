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
      providesTags: ["Users", "Reviews", "ContactQueries", "TeamMembers"], // Add this for cache invalidation
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
    getAllTeamMembers: builder.query({
      query: () => "team",
      providesTags: ["TeamMembers"],
      transformResponse: (response) => response.teamMembers,
    }),
    getSingleTeamMember: builder.query({
      query: (id) => `team/${id}`,
      providesTags: (result, error, id) => [{ type: "TeamMembers", id }],
      transformResponse: (response) => response.teamMember,
    }),

    createTeamMember: builder.mutation({
      query: (teamMemberData) => ({
        url: "team",
        method: "POST",
        body: teamMemberData,
        credentials: "include",
      }),
      invalidatesTags: ["TeamMembers"],
    }),

    updateTeamMember: builder.mutation({
      query: ({ id, ...teamMemberData }) => ({
        url: `team/${id}`,
        method: "PUT",
        body: teamMemberData,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "TeamMembers", id },
        "TeamMembers",
      ],
    }),

    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `team/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["TeamMembers"],
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
  useGetAllTeamMembersQuery,
  useGetSingleTeamMemberQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = adminApi;
