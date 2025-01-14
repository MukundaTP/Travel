import { AnimatedTestimonialsDemo } from "@/components/HomeComponents/AnimatedTestimonals";
import CarouselComponent from "@/components/Carousel";
import HighlightSection from "@/components/HighLightSection";
import { useEffect } from "react";
import MetaData from "@/components/layouts/MetaData";

const Home = () => {
  // Scroll to top when the component is mounted (when the page loads)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      <MetaData title={"Chaithanya Tours And Travels"} />
      <div>
        <CarouselComponent />
        <HighlightSection />
        <AnimatedTestimonialsDemo />
      </div>
    </>
  );
};

export default Home;
