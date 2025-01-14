import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Correct way to access Vite environment variables
const devUrl = `${import.meta.env.VITE_API_DEV_URL}/api/`;
const productionUrl = `${import.meta.env.VITE_API_PRODUCTION_URL}/api/`;

// Updated environment-based URL selection
const baseUrl = import.meta.env.PROD ? productionUrl : devUrl;

export const myApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl, // Use the dynamically selected base URL
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    loadUser: builder.query({
      query: (credentials) => ({
        url: "me",
        method: "GET",
        body: credentials,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: "updatePassword",
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
    }),
    resetPasswordMail: builder.mutation({
      query: (email) => ({
        url: "forgotPassword",
        method: "PUT",
        body: email,
        credentials: "include",
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `resetPassword/${data?.token}`,
        method: "PUT",
        credentials: "include",
        body: {
          password: data?.password,
          confirmPassword: data?.confirmPassword,
        },
      }),
    }),
    udpateProfilePic: builder.mutation({
      query: (data) => ({
        url: "updateProfilePicture",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
  useResetPasswordMailMutation,
  useResetPasswordMutation,
  useUdpateProfilePicMutation,
} = myApi;
