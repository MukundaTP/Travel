import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { useGetReviewsQuery } from "../../Redux/reviewsApi";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedTestimonials from "./ui/animated-testimonals";
import { Button } from "./ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "./ui/skeleton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const LoadingSkeleton = () => (
  <div className="space-y-8 py-20">
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-12 w-3/4 max-w-lg" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
      <Skeleton className="h-80 w-full rounded-3xl" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({ error, refetch }) => (
  <div className="flex items-center justify-center min-h-[400px] px-4">
    <Alert variant="destructive" className="max-w-lg">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="mt-2">
        {error?.data?.message || error?.error || "Failed to load reviews"}
      </AlertDescription>
      <Button variant="outline" className="mt-4" onClick={refetch}>
        <RefreshCcw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </Alert>
  </div>
);

const EmptyState = ({ onOpenDrawer }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
  >
    <h3 className="text-2xl font-bold mb-2">No Reviews Yet</h3>
    <p className="text-gray-600 mb-4">Be the first to share your experience!</p>
    <Button
      onClick={onOpenDrawer} // Use the prop here
      className="bg-gray-700 text-white hover:bg-gray-600 active:scale-95 transition-all duration-150"
    >
      Share Your Experience
    </Button>
  </motion.div>
);
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
  const handleDrawerClose = () => setDrawerOpen(false);

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
        <EmptyState onOpenDrawer={handleDrawerOpen} />
        <AnimatedTestimonials
          testimonials={[]}
          autoplay={false}
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
        {isFetching && (
          <div className="fixed bottom-4 right-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow-lg rounded-full px-4 py-2 text-sm text-gray-600 flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4 animate-spin" />
              Updating...
            </motion.div>
          </div>
        )}

        {/* Review Form Drawer */}
        <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Share Your Experience</DrawerTitle>
              <DrawerDescription>
                Tell us about your experience with our service.
              </DrawerDescription>
            </DrawerHeader>
            {/* The actual form content is in the AnimatedTestimonials component */}
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" onClick={handleDrawerClose}>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedTestimonialsDemo;
