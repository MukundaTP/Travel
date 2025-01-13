import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  // Change reducerPath to match the API name
  reducerPath: "contactApi", // Changed from "reviewsApi" to "contactApi"
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? "https://travel-lql7.onrender.com/api/"
        : "http://localhost:4000/api/",
    credentials: "include", // Add this if you need credentials
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
