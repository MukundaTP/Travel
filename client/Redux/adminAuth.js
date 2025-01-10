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
      providesTags: ["Users"], // Add this for cache invalidation
      transformResponse: (response) => {
        // Add a transform to handle the response structure
        console.log("API Response:", response);
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
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = adminApi;
