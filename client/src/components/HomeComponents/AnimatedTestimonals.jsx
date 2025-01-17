import { useState } from "react";
import { useGetReviewsQuery } from "../../../Redux/reviewsApi";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedTestimonials from "../ui/animated-testimonals";
import ErrorDisplay from "./ErrorDisplay";
import LoadingSkeleton from "./LoadingSkeleton";
import TestimonalsLoading from "./TestimonalsLoading";
import TestimonalsEmptyState from "./TestimonalsEmptyState";

export function AnimatedTestimonialsDemo() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const {
    data: reviews,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetReviewsQuery(undefined, {
    pollingInterval: 30000, // Poll every 30 seconds
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  const handleDrawerOpen = () => setDrawerOpen(true);

  // Transform reviews data if needed
  const transformedReviews = reviews?.map((review) => ({
    id: review?._id,
    name: review?.name,
    message: review?.message,
    rating: review?.rating,
    src: review?.src,
    designation: "Verified Customer",
  }));

  // Early return for loading state
  if (isLoading) return <LoadingSkeleton />;

  // Early return for error state
  if (isError) return <ErrorDisplay error={error} refetch={refetch} />;

  // Early return for empty state
  if (!transformedReviews?.length) {
    return (
      <>
        <TestimonalsEmptyState
          handleDrawerOpen={handleDrawerOpen}
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="testimonials"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AnimatedTestimonials
          testimonials={transformedReviews}
          autoplay={!isFetching}
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setDrawerOpen}
        />

        {/* Optional loading indicator for background updates */}
        {isFetching && <TestimonalsLoading />}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedTestimonialsDemo;
