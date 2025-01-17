import EmptyState from "./EmptyState";
import AnimatedTestimonials from "../ui/animated-testimonals";

const TestimonalsEmptyState = ({
  handleDrawerOpen,
  isDrawerOpen,
  setDrawerOpen,
}) => {
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
};

export default TestimonalsEmptyState;
