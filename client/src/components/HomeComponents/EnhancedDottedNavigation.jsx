import { carouselData } from "@/constants/CarouselData";
import { motion } from "framer-motion";

const EnhancedDottedNavigation = ({
  setDirection,
  currentIndex,
  setCurrentIndex,
}) => {
  return (
    <div className="absolute bottom-8 left-0 right-0 z-20">
      <div className="flex justify-center gap-3">
        {carouselData.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? "right" : "left");
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 border-2 ${
              index === currentIndex
                ? "bg-white border-white scale-110"
                : "bg-white/30 border-white/50 hover:bg-white/50"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedDottedNavigation;
