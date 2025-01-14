import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Correct way to access Vite environment variables
const devUrl = `${import.meta.env.VITE_API_DEV_URL}/api/`;
const productionUrl = `${import.meta.env.VITE_API_PRODUCTION_URL}/api/`;

// Updated environment-based URL selection
const baseUrl = import.meta.env.PROD ? productionUrl : devUrl;

export const contactApi = createApi({
  // Change reducerPath to match the API name
  reducerPath: "contactApi", // Changed from "reviewsApi" to "contactApi"
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["ContactQueries"],
  endpoints: (builder) => ({
    getContactQueries: builder.query({
      query: () => "contact",
      providesTags: ["ContactQueries"],
    }),
    postContactQuery: builder.mutation({
      query: (data) => ({
        url: "contact/contactQueries",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ContactQueries"],
    }),
  }),
});

export const { useGetContactQueriesQuery, usePostContactQueryMutation } =
  contactApi;
