// reviewsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? "https://school-web-wpxn.onrender.com/api/"
        : "http://localhost:4000/api/",
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
          id: review._id,
          name: review.name,
          designation: "Verified Customer", // You can customize this
          quote: review.message,
          rating: review.rating,
          src: review.avatar.url,
          timestamp: review.createdAt,
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
