// reviewsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Correct way to access Vite environment variables
const devUrl = `${import.meta.env.VITE_API_DEV_URL}/api/`;
const productionUrl = `${import.meta.env.VITE_API_PRODUCTION_URL}/api/`;

// Updated environment-based URL selection
const baseUrl = import.meta.env.PROD ? productionUrl : devUrl;

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "reviews",
      providesTags: ["Reviews"],
      // Transform the response data
      transformResponse: (response) => {
        if (!response?.reviews) return [];

        // Transform reviews into the format needed by AnimatedTestimonials
        return response.reviews.map((review) => ({
          name: review.name,
          designation: "Verified Customer", // You can customize this
          rating: review.rating,
          src: review.avatar.url,
          timestamp: review.createdAt,
          message: review.message,
        }));
      },
      // Add cache configuration
      keepUnusedDataFor: 300, // Keep unused data in cache for 5 minutes
    }),
    postReview: builder.mutation({
      query: (data) => ({
        url: "reviews/postReview",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const { useGetReviewsQuery, usePostReviewMutation } = reviewsApi;
