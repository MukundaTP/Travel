import CarouselComponent from "@/components/Carousel";
import HighlightSection from "@/components/HighLightSection";
import TestimonialsSection from "@/components/TestimonalsSectionl";
import React from "react";

const Home = () => {
  return (
    <div>
      <CarouselComponent />
      <HighlightSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
