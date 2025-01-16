import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const devUrl = `${import.meta.env.VITE_API_DEV_URL}/api/`;
const productionUrl = `${import.meta.env.VITE_API_PRODUCTION_URL}/api/`;
const baseUrl = import.meta.env.PROD ? productionUrl : devUrl;

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "admin/users", // Updated to match backend route
        credentials: "include",
      }),
      providesTags: ["Users"],
      transformResponse: (response) => response?.users || [],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/user/${id}`, // Updated to match backend route
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: ({ id, isAdmin }) => ({
        url: `admin/user/${id}`, // Updated to match backend route
        method: "PATCH",
        credentials: "include",
        body: { isAdmin },
      }),
      invalidatesTags: ["Users"],
    }),

    getAllReviews: builder.query({
      query: () => ({
        url: "reviews", // This matches your ReviewsRoute prefix
        credentials: "include",
      }),
      providesTags: ["Reviews"],
      transformResponse: (response) => response?.reviews || [],
    }),

    updateReview: builder.mutation({
      query: ({ id, message }) => ({
        url: `reviews/${id}`, // Updated to match ReviewsRoute
        method: "PATCH",
        credentials: "include",
        body: { message },
      }),
      invalidatesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `reviews/${id}`, // Updated to match ReviewsRoute
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Reviews"],
    }),

    getAllContactQueries: builder.query({
      query: () => ({
        url: "contact", // Updated to match ContactRoute
        credentials: "include",
      }),
      providesTags: ["ContactQueries"],
      transformResponse: (response) => response?.contacts || [],
    }),

    deleteContactQueries: builder.mutation({
      query: (id) => ({
        url: `contact/${id}`, // Updated to match ContactRoute
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ContactQueries"],
    }),

    getAllTeamMembers: builder.query({
      query: () => ({
        url: "admin/team", // Updated to match AdminRoute
        credentials: "include",
      }),
      providesTags: ["TeamMembers"],
      transformResponse: (response) => response?.teamMembers || [],
    }),

    getSingleTeamMember: builder.query({
      query: (id) => ({
        url: `admin/team/${id}`, // Updated to match AdminRoute
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "TeamMembers", id }],
      transformResponse: (response) => response?.teamMember,
    }),

    createTeamMember: builder.mutation({
      query: (teamMemberData) => ({
        url: "admin/team", // Updated to match AdminRoute
        method: "POST",
        body: teamMemberData,
        credentials: "include",
      }),
      invalidatesTags: ["TeamMembers"],
    }),

    updateTeamMember: builder.mutation({
      query: ({ id, ...teamMemberData }) => ({
        url: `admin/team/${id}`, // Updated to match AdminRoute
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
        url: `admin/team/${id}`, // Updated to match AdminRoute
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
